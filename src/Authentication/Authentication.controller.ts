import AuthenticationService from './Authentication.service';
import { AuthenticationControllerInterface } from './Authentication.interface';
import { sign, verify, decode } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { Request,Response, NextFunction } from 'express';
import { genSalt, compare, hash } from 'bcrypt';


class AuthenticationController implements AuthenticationControllerInterface{

	private userService: any;

	constructor(){
		this.userService = new AuthenticationService();
	}

	public loginUser(request:Request,response:Response) {
		// Get body data
		response.json({message : 'it work--s!'});
		// Find email if possible
			// if found then
				// compare password
				// Load hash from your password DB.
				// const matched = await compare(password, user.password);
					// if compared then
						// sign a token
							// send it back to the frontend
					// if not then
						// tell the user that credentials not correct
			// if not then
				// tell the user that credentials not correct
	}
	public registerUser(request:Request,response:Response) {
		// Get body data
		// Check if email is exists
			// if true then
				// tell the user that email already taken
			// if not then
				// Hash the password
				// Hash the password
				// const salt = await bcrypt.genSalt(10);
				// const hashed_password = await bcrypt.hash(password,salt);
				// Store new user in the database
				// sign a token
					// send it back to the frontend	
	}
	public changePassword(request:Request,response:Response) {
		// Get body data
		// Check email is exists
			// if true then
				// generate a random password 
				// Hash it
				// Update it with forgotten one
				// then send it to the user's inbox via email
			// if not then
				// tell the user that email is not exists
	}
	public Authenticated?(request:Request,response:Response,next:NextFunction){
		// Get the token in the query
		// Find the appropriate user that owns this token
			// if found then 
				// next and allow him make changes on the resourses
			// if not then
				// tell the user that he didnt Authenticated and route him to login page
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