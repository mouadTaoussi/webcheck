import AuthenticationService from './Authentication.service';
import { AuthenticationControllerInterface, UserBody, UserInterface, UserUpdate } from './Authentication.interface';
import { sign, verify, decode } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { Request,Response, NextFunction } from 'express';
import { genSalt, compare, hash } from 'bcrypt';
import { v4 } from 'uuid';

const userService = new AuthenticationService();

class AuthenticationController implements AuthenticationControllerInterface{

	// private userService: any;

	// constructor(){
	// 	this.await userService = new AuthenticationService();
	// }

	public async loginUser(request:any,response:Response):Promise<void>  {
		// Get body data
		const body: { email:string, password:string } = request.body;

		// Find email if possible
		const userEmail = await userService.findUser({ email: body.email ,id :undefined});

		// if found then
		if (userEmail.found == true) {
			// compare password
			// Load hash from your password DB.
			const matched: boolean = await compare(body.password, userEmail.user.password);

			// if compared then
			if (matched != true) {response.status(404).send({ message: "credentials aren't correct!" })}
			else {
				// sign a token
				const user_token:string = sign({id:userEmail.user._id, email: userEmail.user.email} ,'bgfgngf');

				// send it back to the frontend
				response.status(userEmail.status).send({ loggedin : true, message : "Logged in!", user_token : user_token })
			}
		}
		else {
			// if not then
			response.status(userEmail.status).send({ loggedin : false, message : "Incorrect credentials!", }) 
		}	
	}	
		
	public async registerUser(request:any,response:Response):Promise<void> {

		// Get body data
		const body: UserBody = request.body;

		// Check if email is exists
		const emailExists = await await userService.findUser({email : body.email, id: undefined});
		
		// if true then
		// tell the user that email already taken
		if (emailExists.found == true) {response.status(404).send({registered : false,message : 'email already exists'})}
		else {
			// if not then
			// Hash the password
			// Hash the password
			const salt = await genSalt(10);
			const hashed_password = await hash(body.password, salt);

			body.password      = hashed_password;
			body.active        = true;
			body.websitesCount = 1;

			// Store new user in the database
			const new_user = await userService.addUser(body);
			// Check whether saved or not
			if (new_user.saved == true) {

				const user_token = sign({ id:new_user.user._id,email: new_user.user.email } ,'bgfgngf');

				// send it back to the frontend	
				response.status(new_user.status).send({ registered : true, message: "Registered successfully!", user_token:user_token  })

			}
			else {
				response.status(new_user.status).send({
					message : "Something went wrong!"
				})
			}

			// sign a token
		}
	}

	public async resetPassword(request:any,response:Response):Promise<void> {
		// Get body data
		const body: { email: string } = request.body;

		// Check email is exists
		const user = await userService.findUser({ id : undefined, email :body.email });

		// if true then
		if ( user.found == true ) {

			// generate a random password 
			const password = v4();

			// Hash it
			const salt            = await genSalt(10);
			const hashed_password = await hash(password, salt);

			// Update it with forgotten one
			const updatePassword:{ 

				status:number,changed:boolean, message:string 
				
			} = await userService.changePassword(user.user._id, hashed_password);

			response.status(updatePassword.status).send({
				sent : true,
				message : "email sent to your inbox!",
			})
		}
		else {
			response.status(404).send({
				message : "Make sure to put a correct email!",
				sent    : false
			})
		}
	}
	public async updateUser(request:any,response:Response):Promise<void> {
		// Get the user by its token
		const user: { 
			iat:string, email:string, id:string } = request.user;

		// Get body data
		const body: UserUpdate = request.body;

		// Update user
		const updating: { 
			status:number,updated:boolean,message:string } = await userService.updateUser(user.id,body);

		// Response back
		response.status(updating.status).send({
			updated : updating.updated,
			message : updating.message
		})

	} 
	public async deleteUser(request:any,response:Response):Promise<void> {
		// Require password to change user data
		// Get the password to authorize user to change his credentials
		const password: { password: string } = request.body.password;

		if (!password) {response.status(400).send({message:"no password prvided!"}); response.end()};

		// Find user by its token
		const user: any = await userService.findUser({ email: undefined ,id: request.user.id});

		// if found then
		if (user.found == true) {
			// compare password
			// Load hash from your password DB.
			const matched: boolean = await compare(password, user.user.password);

			// Check if the passwords matched
			if (matched) {
				// Delete user
				const user: { 
					status:number,deleted:boolean,message:string } = await userService.deleteUser(request.user.id);
				// Delete thier logs
				response.status(user.status).send({
					deleted : user.deleted, message : user.message
				})
			}
			else {
				response.status(401).send({ message : 'Not authorized' })
			}
		}
		else {
			response.status(401).send({ message : 'Not authorized' })
		}
	} 

	public async Authenticated(request:Request | any,response:Response,next:NextFunction):Promise<void> {
		// Get the token in the query
		const token = request.query.token;

		// Ckecking...
		if (!token) { 
			response.status(401).send({message:"Not authenticated"}) 
		}
		else {
			// Find the appropriate user that owns this token
			const user = await verify(token,"bgfgngf");

			if (!user) response.status(401).send({ message:'token not valid', });

			request.user = user;
			next();
		}
	}
}

export default AuthenticationController;
// then send it to the user's inbox via email
// Create transporter object with credentials
// var transporter = nodemailer.createTransport({
// 	service :'gmail',
// 	auth: { user: process.env.EMAIL_ADDRESSE, pass: process.env.EMAIL_PASSWORD }
// });
// // Check the language the user set in the app to send the email appropriated to his language
// let mailTemplate;

// // send it!
// transporter.sendMail({
// 	from: '"SurveyApp Team" <mouadtaoussi0@gmail.com>',
//     to: email,
//     subject: 'Reset password request',
//     text: 'Hey there, it’s your link to change your password below ;) ', 
//     html: mailTemplate
// });