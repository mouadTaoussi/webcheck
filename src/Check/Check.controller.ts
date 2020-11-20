import CheckWebsitesService from './Check.service';
import { CheckWebsiteControllerInterface } from './Check.interface';
import { websiteType } from '.././Authentication/Authentication.interface';
import axios, { AxiosResponse } from 'axios';
import webpush, { sendNotification, generateVAPIDKeys,setVapidDetails } from 'web-push';
import { Request, Response } from 'express';
import AuthenticationService from '.././Authentication/Authentication.service';

const websiteService = new CheckWebsitesService();
const userService = new AuthenticationService();

class CheckWebsiteController implements CheckWebsiteControllerInterface{

	private  websitesLogService  : any;
	// private userService: any;
	private vapidPublicKey : string = "BD99nt4AZUQlt5-ev2zGs_QSHt9Q-4Oj9ULgYphwUb3JuK0NnW_CBvoZVEMuQPmgD4aW4VxhGu4q_3augFNGi68"; 
	private vapidPrivateKey: string = "dfRRdDeegcQoENJOXao_Hi2hcP3nlUDtKKwrhWWpGJE"; 


	constructor(){
		// this.websitesLogService = new CheckWebsitesService();
		webpush.setGCMAPIKey('<Your GCM API Key Here>');
		webpush.setVapidDetails(
		  'mailto:example@yourdomain.org',
		  this.vapidPublicKey,
		  this.vapidPrivateKey
		);
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
	public async deleteWebsiteLogs(request:any,response:Response):Promise<void> {
		// Get user id to delete thier websites logs<Token>
		const user: { 
			iat:string, email:string, id:string } = request.user;
		// Service
		const deleting = await websiteService.deleteLogs(user.id, undefined);
		// Send the response back
		response.status(deleting.status).send({
			message : deleting.message 
		});	
	}
	public async checkEveryWebsiteExists():Promise<void> {
		// console.log('Hello');
		// Get all users
		const users = await userService.findUser({id:undefined,email:undefined});
		// console.log(users.user[0])
		// Loop
		for (let i = 0; i < users.user.length ; i++) {
			// console.log(users.user[i]);
			// get first user
				// Loop
				for (let o = 0; o < users.user[i].websites.length; o++) {
					// check thier websites
					// Check if the already is down by checking website[i].active
					// if true then
					// console.log(users.user[i].websites)
					if ( users.user[i].websites[o].active ) {
						// axios
						try {
							const checking : AxiosResponse<any> = await axios({
							method : 'GET',
							url : users.user[i].websites[o].website,
							headers : {
								'Content-Type': 'text-html',
								'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
							}
							})
							console.log(checking.status == 200);
						// 		// move on
						}
						// // if one of the websites is down
						catch (error){
							// Status code
							let statusCode: number;

							if (error.response){
								 // @TODO check by use regex or includes
								if (error.response.status == 500){
									// 	// send a notification
									//  // init payload
									const payload : { title: string, url: string } = {
										title:"Might be you provided a wrong website url!",
										url  : users.user[i].websites[o].website
									}
									//  // send a notification
									sendNotification(
										users.user[i].pushRegisteration,JSON.stringify(payload)
									)
								} // @TODO check by use regex or includes
								else if (error.response.status == 404) {
									//   @TODO	// set website[i].active to false
									users.user[i].websites[o].active = false;
									console.log(users.user[i].websites[o].active)
									
									//  // init payload
									const payload : { title: string, url: string } = {
										title:"A one of your Websites is down!!!",
										url  : users.user[i].websites[o].website
									}
									//  // send a notification and email
									sendNotification(
										users.user[i].pushRegisteration,JSON.stringify(payload)
									)
									// 	// nodemailer + webpush
									// 	// push a log to the database 
									// 	// new CheckWebsitesService().pushLog; 
									// 	// status_code:number, user_id:string, website_id:string
								}
							}
						}
					}
					// if website[i].active is false
					else {
							// axios
							// if one of the websites is down
								// move on
							// if not
								// set website[i].active to true
								// move on
					}

				}
		}


	}

}

// Run <checkEveryWebsiteExists> Job every 2 minutes
const checkWebsitesJob = new CheckWebsiteController().checkEveryWebsiteExists;

setInterval(checkWebsitesJob,10000);
// 60000
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