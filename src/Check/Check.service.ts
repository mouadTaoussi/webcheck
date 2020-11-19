import { CheckWebsiteServiceInterface, ServerStatusCodesType, WebsiteLog } from './Check.interface';
import { websiteType, UserInterface } from '.././Authentication/Authentication.interface';
import WebsiteLogModel from './Check.model';
import UserModel from '.././Authentication/Authentication.model';
import { v4, v5 } from 'uuid';
import {  } from 'moment';
 
class CheckWebsitesService implements CheckWebsiteServiceInterface{

	private websitelogmodel   : any;
	private statusCodes       : ServerStatusCodesType<string>;

	constructor(){
		this.websitelogmodel = WebsiteLogModel;
		this.statusCodes = [
			{ code : 500, description : "Internal Server Error" },
			{ code : 501, description : "Not Implemented: The server either does not recognize the request method,or it lacks the ability to fulfil the request." },
			{ code : 502, description : "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream." },
			{ code : 503, description : "Service Unavailable: The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state." },
			{ code : 504, description : "Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server." },
			{ code : 505, description : "HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request." },
			{ code : 506, description : "Variant Also Negotiates (RFC 2295): Transparent content negotiation for the request results in a circular reference." },
			{ code : 507, description : "Insufficient Storage (WebDAV; RFC 4918): The server is unable to store the representation needed to complete the request." },
			{ code : 509, description : "Loop Detected (WebDAV; RFC 5842): The server detected an infinite loop while processing the request (sent instead of 208 Already Reported)." },
			{ code : 510, description : "Not Extended (RFC 2774): Further extensions to the request are required for the server to fulfil it." },
			{ code : 511, description : "Network Authentication Required (RFC 6585)." }
		]
	}

	public async addWebsite(user_id:string,website: websiteType)
	:Promise<{status:number,message:string | null,data:any | null}> 
	 {
		// Get website data
		// Save it !!!
		try {
			// Find the user
			const user: UserInterface = await UserModel.findOne({_id:user_id});

			// Check his websitesCount 
			if (user.websitesCount < 3 ) {

				// Get him websites
				const userWebsites: [websiteType] = user.websites;

				// Increase websitesCount by one, so we can limit users websites 
				const plusOne: number = user.websitesCount + 1;

				// Set to true by default
				website.active = true;

				// Push the new website to the current websites array
				userWebsites.push(website);

				// Increase websitesCount then Save it to the database
				const update = await UserModel.findByIdAndUpdate(user_id,{
					websitesCount : plusOne, 
					websites      : userWebsites
				})

				return { 
					status  : 200, message : 'A NEW WEBSITE ADDED!!', data : website }
			}
			else {
				return {
					status  : 200, message : 'You cannot add more than 3 websites!!',
					data : null }
			}
		} catch(error) {
			return {
				status  : 500, message : "Something went wrong!", data : null }
		}
	}

	public async deleteWebsite(user_id:string,website_id: string)
	:Promise<{status:number,message:string | null}> 
	 {
		try {
			// Get website data
			const user: UserInterface = await UserModel.findOne({_id:user_id});

			// Get user websites
			const websites: [websiteType] = user.websites;

			// Websites without the targeted one to be deleted
			let websitesNotDeleted: [websiteType] | [] = [];

			// Remove the target website
			for (var i = 0; i < websites.length; i++) {

				if ( websites[i]._id.toString() == website_id.toString() ) {
					continue;
				}
				else {
					websitesNotDeleted.push(websites[i]);
				}
			}
			// Decrease one in websitesCount
			const decreaseOne: number = user.websitesCount - 1;

			// Save it !!! 👌👌
			const update = await UserModel.findByIdAndUpdate(user_id,{
				websitesCount : decreaseOne, 
				websites      : websitesNotDeleted
			})

			return { status  : 200, message : "Website deleted successfully", }
		}
		catch(error) {
			return { status  : 500, message : "Something went wrong!", }
		}
	}

	public async pushLog( status_code:number, user_id:string, website_id:string )
	:Promise<{status:number,message:string | null,data:any | null}> 
	{
		// Get to know the reasons
		// Push
		try {
			return {
				status  : 200, message : null, data : null }
		}
		catch(error) {
			return {
				status  : 500, message : "Something went wrong!", data : null}
		}
	}

	public async getLogs( user_id:string )
	:Promise<{status:number,message:string | null,data:any | null}> 
	{
		try {
			// Get user
			const user: UserInterface = await UserModel.findOne({_id:user_id});

			// Get logs of each website
			let logs: [WebsiteLog] = await WebsiteLogModel.find({
				user_id: user._id
			});

			// // Loop over user websites
			// for( let i = 0; i < websites[i]; i++) {

			// 	// Put logs of the current website
			// 	let currentWebsiteLogs: [WebsiteLog] | [] = [];

			// 	// Get logs of website[i]
			// 	const websitelogs: [WebsiteLog] = await WebsiteLogModel.find({
			// 		user_id:user_id
			// 	})

			// 	for ( let o = 0; o < websitelogs.length ; o++ ) {
			// 		websitelogs[o]
			// 	}

			// }

			return { status  : 200, message : null, data : logs }
		}
		catch(error) {
			return {
				status  : 500,  message : "Something went wrong!", data : null
			}
		}
	}

	public async deleteLogs( user_id:string, website_id:string | undefined )
	:Promise<{status:number,message:string | null,data:any | null}> 
	{
		try {
			// Delete user logs
			const deleting = await UserModel.find({ user_id: user_id }).remove();
			// console.log(deleting)
			return { status  : 200, message : "Logs has been deleted successfully", data : null }
		}
		catch(error) {
			return { 
				status  : 500,  message : "Something went wrong!", data : null
			}
		}
	}	
}

export default CheckWebsitesService;