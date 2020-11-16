import CheckWebsitesService from './Check.service';
import { CheckWebsiteControllerInterface } from './Check.interface';
import { websiteType } from '.././Authentication/Authentication.interface';
import axios from 'axios';
import { generateVAPIDKeys,setVapidDetails } from 'web-push';
import { Request, Response } from 'express';

const websiteService = new CheckWebsitesService();

class CheckWebsiteController implements CheckWebsiteControllerInterface{

	private  websitesLogService  : any;

	constructor(){
		this.websitesLogService = new CheckWebsitesService();
	}

	public async addWebsite(request:any,response:Response):Promise<void> {
		// Get body data along side owner
		const website: websiteType = request.body;
		// Get the user by its token
		const user: { 
			iat:string, email:string, id:string } = request.user;

		// Service
		const saving = await websiteService.addWebsite(user.id,website);
		
		// Send the response back
		response.status(saving.status).send({
			message : saving.message,
			website : saving.data
		})
	}
	// public async userWebsites(request:any, response: Response):Promise<void> {
	// 	// Get user id to show thier websites logs<Token>
	// 	// Service 
	// 	// Send the response back
		
	// 	response.json({message: 'it works!'});
	// }
	public async deleteWebsite(request:any,response:Response):Promise<void> {
		// Get user
		const user: { 
			iat:string, email:string, id:string } = request.user;

		// Get website id
		const {website_id} = request.query;

		// Service
		const deleting = await websiteService.deleteWebsite(user.id, website_id);

		// Send the response back
		response.status(deleting.status).send({
			message : deleting.message,
		})		
	}
	public async websiteLogs(request:any,response:Response):Promise<void> {
		// Get user id to show thier websites logs<Token>
		const user: { 
			iat:string, email:string, id:string } = request.user;

		// Service
		const logs = await websiteService.getLogs(user.id);	

		// Send the response back
		response.status(logs.status).send({
			logs : logs.data,
		});
	}
	public async deleteWebsiteLogs(request:Request,response:Response):Promise<void> {
		// Get user id to delete thier websites logs<Token>
		// Service
		// Send the response back
		
		response.json({message : 'it works!'});	
	}
	public async checkEveryWebsiteExists():Promise<void> {
		console.log('Hello');
		// Get all users
		// const users = await User
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