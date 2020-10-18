import CheckWebsitesService from './Check.service';
import { CheckWebsiteControllerInterface } from './Check.interface';
import axios from 'axios';
import { generateVAPIDKeys } from 'web-push';
import { Request, Response } from 'express';
 
class CheckWebsiteController implements CheckWebsiteControllerInterface{

	private  websitesLogService  : any;

	constructor(){
		this.websitesLogService = new CheckWebsitesService();
	}

	public addWebsite(request:any | any,response:Response) {
		// Get body data along side owner 
		// Service
		// Send the response back
		response.json({message : 'it works!'});
	}
	public websiteLogs(request:any | any,response:Response) {
		// Get user id to show thier websites logs
		// Service
		// Send the response back
		response.json({message : 'it works!'});
	}
	public checkEveryWebsiteExists(){
		// Get all users
		// Loop
		// get first user
			// Loop
			// check thier websites
				// Check if the already is down by checking website[i].active
				// if true then
					// axios
					// if one of the websites is down
						// set website[i].active to false
						// send a notification and email
						// nodemailer + webpush
						// push a log to the database 
						// new CheckWebsitesService().pushLog; 
						// status_code:number, user_id:string, website_id:string
					// if not
						// move on
				// if website[i].active is false
					// axios
					// if one of the websites is down
						// move on
					// if not
						// set website[i].active to true
						// move on


	}

}

// Run <checkEveryWebsiteExists> Job every 2 minutes
const checkWebsitesJob = new CheckWebsiteController().checkEveryWebsiteExists;

setInterval(checkWebsitesJob,60000);

export default CheckWebsiteController;

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