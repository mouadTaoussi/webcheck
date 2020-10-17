import AuthenticationService from './Authentication.service';
import { AuthenticationControllerInterface, UserBody } from './Authentication.interface';
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

	public async loginUser(request:Request,response:Response) {
		// Get body data
		const body: { email:string, password:string } = request.body;

		// Find email if possible
		const userEmail = await userService.findUser({ email: body.email ,id :undefined});

		// if found then
		if (userEmail.found == true) {
			// compare password
			// Load hash from your password DB.
			const matched = await compare(body.password, userEmail.user.password);

			// if compared then
			if (matched != true) {response.json({ message: "credentials aren't correct!" })}
			else {
				// sign a token
				const user_token:string = sign({id:userEmail.user._id, email: userEmail.user.email} ,'bgfgngf');

				// send it back to the frontend
				response.json({ loggedin : true, message : "Logged in!", user_token : user_token })
			}
		}
		else {
			// if not then
			response.json({ loggedin : false, message : "Incorrect credentials!", }) 
		}	
	}	
		
	public async registerUser(request:Request,response:Response) {

		// Get body data
		const body: UserBody = request.body;

		// Check if email is exists
		const emailExists = await await userService.findUser({email : body.email, id: undefined});
		
		// if true then
		// tell the user that email already taken
		if (emailExists.found == true) {response.json({registered : false,message : 'email already exists'})}
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

			// sign a token
			const user_token = sign({ id:new_user.user._id,email: new_user.user.email } ,'bgfgngf');

			// send it back to the frontend	
			response.json({ registered : true, message: "Registered successfully!", user_token:user_token  })
		}
	}

	public async resetPassword(request:Request,response:Response) {
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
			const updatePassword = await userService.changePassword(body.email, hashed_password);
			// then send it to the user's inbox via email
			response.json({
				sent : true,
				message : "email sent to your inbox!",
			})
		}
		else {
			response.json({
				message : "Make sure to put a correct email!",
				sent    : false
			})
		}
		// if not then
			// tell the user that email is not exists
	}

	public async Authenticated?(request:Request | any,response:Response,next:NextFunction){
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