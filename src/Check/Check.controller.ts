import CheckWebsitesService from './Check.service';
import { CheckWebsiteControllerInterface, handlePushAndEmailOptions } from './Check.interface';
import { websiteType, subscriptionObject } from '.././Authentication/Authentication.interface';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import webpush, { sendNotification, generateVAPIDKeys,setVapidDetails } from 'web-push';
import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import AuthenticationService from '.././Authentication/Authentication.service';
import application_config from '.././main.config';

const websiteService = new CheckWebsitesService();
const userService = new AuthenticationService();

class CheckWebsiteController implements CheckWebsiteControllerInterface {

	private websitesLogService : any;
	private vapidPublicKey : string | undefined = application_config.vapid_public_key; 
	private vapidPrivateKey: string | undefined = application_config.vapid_private_key;


	constructor(){
		// Set vapid keys 
		webpush.setGCMAPIKey('<Your GCM API Key Here>');
		webpush.setVapidDetails(
		  'mailto:example@yourdomain.org',
		  this.vapidPublicKey,
		  this.vapidPrivateKey
		);
		// Request interceptor will startTime
		axios.interceptors.request.use((config) => {
			config.metadata = { startTime: new Date()}
		 	return config;
		},(error)=>{
			return Promise.reject(error);
		});
		// Response interceptor will set endTime & calculate the duration
		axios.interceptors.response.use((response) => {
			response.config.metadata.endTime = new Date()
			response.duration = response.config.metadata.endTime - response.config.metadata.startTime
			return response;
		},(error) => {
			error.config.metadata.endTime = new Date();
			error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
			return Promise.reject(error);
		});
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
		// @TODO : check if he'is allowed to send emails to him
		if (!options.receiving_email) return;
		// nodemailer
		// Create transporter object with credentials
		var transporter = createTransport({
			service :'gmail',
			auth: { user: application_config.email, pass: application_config.password }
		});
		// Check the language the user set in the app to send the email appropriated to his language
		let mailTemplate : string = `
		<!DOCTYPE html><!-- English template -->
		<html>
		<head>
			<title>Email template</title>
		</head>
		<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
		<center></center>
		<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">
		<h1>Hello! ${ options.user_email }</h1>
		<h5>${ options.message }</h5>
		<h2>Website: ${options.website_name}</h2>
		<p><strong>Thank you!</strong></p>
		<p>WebCheck Team.</p>
		</div>
		<center>
		<ul style="list-style: none;margin: 10px 10px 10px 10px;" class="footer-list local-mt-4">
			<li style='display: inline;padding:8px;' class='footer-list-item'>Terms of service</li>
			<li style='display: inline;padding:8px;' class='footer-list-item'>Privacy & policy</li>
			<li style='display: inline;padding:8px;' class='footer-list-item'>How it works?</li>
		</ul>
		</center>
		</body>
		</html>
		`;

		try {
			// send it!
			transporter.sendMail({
				from: '"WebCheck Team" <mouadtaoussi0@gmail.com>',
			    to: options.user_email,
			    subject: 'Something went wrong!',
			    text: options.message, 
			    html: mailTemplate
			});
		}
		catch(err){
			console.log('Something went wrong with nodemailer')			
			console.log(err.message);			
		}
		// 	// push a log to the database 
		const push = await websiteService.pushLog(options.status_code,options.user_id,options.website_id); 
	}
	public async checkEveryWebsiteExists():Promise<void> {
		// console.log('Hello');
		// Get all users
		const users = await userService.findUser({id:undefined,email:undefined});
		// Loop
		for (let i = 0; i < users.user.length ; i++) {
			// @TODO : Check whether he'is allowed to check his websites
			if (!users.user[i].active) { continue }
			else {
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
						}
						})
						// @TODO Push time in melliseconds
						const responseTime: number = checking.duration;
						// const pushing = await websiteService.pushResponseTimeForWebsite(users.user[i].websites[o]._id,responseTime);
					}
					// // if one of the websites is down
					catch (error){
						if (error.response) {
						// set website[i].active to false
						users.user[i].websites[o].active = false;
						// Save that active in the database
						await users.user[i].save();

						new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration,
						{
							message: "Your website is currently down!",
							url    : users.user[i].websites[o].website,
							website_name : users.user[i].websites[o].name,
							status_code: error.response.status,
							user_id    : users.user[i]._id,
							user_email : users.user[i].email,
							receiving_email : users.user[i].receivingEmail,
							website_id : users.user[i].websites[o]._id
						})
						}
						else {

						if (error.message.includes('ENOTFOUND')) {
							// set website[i].active to false
							users.user[i].websites[o].active = false;
							// Save that active in the database
							await users.user[i].save();

							new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration,
							{
								message: "Might be you entered a wrong website url!",
								url    : users.user[i].websites[o].website,
								website_name : users.user[i].websites[o].name,
								status_code: 404,
								user_id    : users.user[i]._id,
								user_email : users.user[i].email,
								receiving_email : users.user[i].receivingEmail,
								website_id : users.user[i].websites[o]._id
							})
						}
						else if (error.message.includes('ECONNREFUSED')) {
							// set website[i].active to false
							users.user[i].websites[o].active = false;
							// Save that active in the database
							await users.user[i].save();

							new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration,
							{
								message: "Your website is currently down!",
								url    : users.user[i].websites[o].website,
								website_name : users.user[i].websites[o].name,
								status_code: 500,
								user_id    : users.user[i]._id,
								user_email : users.user[i].email,
								receiving_email : users.user[i].receivingEmail,
								website_id : users.user[i].websites[o]._id
							})
						}

						}
					}
				} /* if website[i].active is false */ else {
					// axios
					try {
						const checking : AxiosResponse = await axios({
							method : 'GET',
							url : users.user[i].websites[o].website,
							headers : {
								// 'Content-Type': 'text-html',
								"access-control-allow-origin": "*",
							}
						})
						// @TODO Push time in melliseconds
						const responseTime: number = checking.duration;
						// const pushing = await websiteService.pushResponseTimeForWebsite(users.user[i].websites[o]._id,responseTime);
						
						//  // set website[i].active to false
						users.user[i].websites[o].active = true;
						// Save that active in the database
						await users.user[i].save();
					}
					catch (error){ continue; }
				}
			}
			}
		}
	}
	// Calculate average time per day per website
	public async calculateAverageResponseOfWebsite(): Promise<void> {
		// loop over <websitesResponsesTime>
		const responsesTime = await websiteService.getResponsesTimesForWebsites();

		for (var i = 0; i < responsesTime.data.length; i++ ){
			var sum: number = 0;
			var average: number = 0;
			
			// Get user id and the website id
			const user_id: string = responsesTime.data[i].user_id;
			const website_id: string = responsesTime.data[i].website_id;
			
			// Sum the melliseconds
			for (var io = 0; io < responsesTime.data[i].response_times_melliseconds.length; ++io) {
				// code...
				sum += responsesTime.data[i].response_times_melliseconds[io];
			}
			// Calculate the average
			average = sum / responsesTime.data[i].response_times_melliseconds.length;
			// add new entity with the average calculated in the <websiteAverageTimeInDay>
			// make the current <websitesResponsesTime.response> empty
			// Implement queue to delete the first entity if the long reached to 10
		}
	}
}

export default CheckWebsiteController;