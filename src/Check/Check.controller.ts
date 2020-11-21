import CheckWebsitesService from './Check.service';
import { CheckWebsiteControllerInterface, handlePushAndEmailOptions } from './Check.interface';
import { websiteType, subscriptionObject } from '.././Authentication/Authentication.interface';
import axios, { AxiosResponse } from 'axios';
import webpush, { sendNotification, generateVAPIDKeys,setVapidDetails } from 'web-push';
import { Request, Response } from 'express';
import AuthenticationService from '.././Authentication/Authentication.service';

const websiteService = new CheckWebsitesService();
const userService = new AuthenticationService();

class CheckWebsiteController implements CheckWebsiteControllerInterface{

	private  websitesLogService  : any;
	private vapidPublicKey : string = "BD99nt4AZUQlt5-ev2zGs_QSHt9Q-4Oj9ULgYphwUb3JuK0NnW_CBvoZVEMuQPmgD4aW4VxhGu4q_3augFNGi68"; 
	private vapidPrivateKey: string = "dfRRdDeegcQoENJOXao_Hi2hcP3nlUDtKKwrhWWpGJE"; 


	constructor(){
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
	// @TODO : create a method that handle push notifications and sending email
	// as well as controle the website whether if down or not
	public async handlePushAndEmail(registeration:subscriptionObject,options:handlePushAndEmailOptions)
	: Promise<void> {
		//  // init payload
		const payload : { title: string, url: string } = {
			title: options.message,
			url  : options.url
		}
		//  // send a notification and email
		sendNotification(
			registeration,JSON.stringify(payload)
		)
		// 	// nodemailer
		// 	// push a log to the database 
		// 	// new CheckWebsitesService().pushLog; 
		// 	// status_code:number, user_id:string, website_id:stringify
	}
	public async checkEveryWebsiteExists():Promise<void> {
		// console.log('Hello');
		// Get all users
		const users = await userService.findUser({id:undefined,email:undefined});
		// Loop
		for (let i = 0; i < users.user.length ; i++) {
				// Loop
				for (let o = 0; o < users.user[i].websites.length; o++) {

					// Check if the already is down by checking website[i].active
					if ( users.user[i].websites[o].active ) {
						
						// axios 
						try {
							const checking : AxiosResponse = await axios({
							method : 'GET',
							url : users.user[i].websites[o].website,
							headers : {
								// 'Content-Type': 'text-html',
								"access-control-allow-origin": "*",
								// 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
							}
							})
						// 		// move on
						console.log('website')
						}
						// // if one of the websites is down
						catch (error){
							if (error.response) {
								//   @TODO	// set website[i].active to false
								users.user[i].websites[o].active = false;
								// Save that active in the database

								this.handlePushAndEmail(users.user[i].pushRegisteration,
								{
									message: "Your website is currently down!",
									url    : users.user[i].websites[o].website,
									status_code: error.response.status,
									user_id    : users.user[i]._id,
									website_id : users.user[i].websites[o]._id
								})
							}
							else  {
								if (error.message.includes('ENOTFOUND')) {
									//   @TODO	// set website[i].active to false
									users.user[i].websites[o].active = false;
									// Save that active in the database

									this.handlePushAndEmail(users.user[i].pushRegisteration,
									{
										message: "Might be you entered a wrong website url!",
										url    : users.user[i].websites[o].website,
										status_code: 404,
										user_id    : users.user[i]._id,
										website_id : users.user[i].websites[o]._id
									})
								}
								else if (error.message.includes('ECONNREFUSED')) {
									console.log('server error')
									//   @TODO	// set website[i].active to false
									users.user[i].websites[o].active = false;
									// Save that active in the database

									this.handlePushAndEmail(users.user[i].pushRegisteration,
									{
										message: "Your website is currently down!",
										url    : users.user[i].websites[o].website,
										status_code: 500,
										user_id    : users.user[i]._id,
										website_id : users.user[i].websites[o]._id
									})
								}
							}
						}
					}
					// if website[i].active is false
					else {
							// axios
							try {
								const checking : AxiosResponse = await axios({
									method : 'GET',
									url : users.user[i].websites[o].website,
									headers : {
										// 'Content-Type': 'text-html',
										"access-control-allow-origin": "*",
										// 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
									}
									})
								// 		// move on
								console.log('website')
								// if not
									// set website[i].active to true
									// move on
							}
							catch (error){
								// if one of the websites is down
									// move on
							}
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