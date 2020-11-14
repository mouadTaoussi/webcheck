import { CheckWebsiteServiceInterface, ServerStatusCodesType } from './Check.interface';
import { websiteType } from '.././Authentication/Authentication.interface';
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
			const user = await UserModel.findOne({_id:user_id});
			console.log(user)

			// Check his websitesCount 
			if (user.websitesCount < 3 ) {

				// Get him websites
				const userWebsites = user.websites;
				console.log(userWebsites);

				website.active = true;

				// Push the new website to the current websites array
				userWebsites.push(website);

				// Increase websitesCount then Save it to the database
				const update = await UserModel.findByIdAndUpdate(user_id,{
					websitesCount: user.websitesCount++, 
					websites: userWebsites
				})

				return {
					status  : 200, 
					message : 'A NEW WEBSITE ADDED!!',
					data : website
				}

			}
			else {
				return {
					status  : 200, 
					message : 'You cannot add more than 3 websites!!',
					data : null
				}
			}
		}
		catch(error) {
			return {
				status  : 500, 
				message : "Something went wrong!",
				data : null
			}
		}

	}
	// public async userWebsites(user_id: string)
	// :Promise<{status:number,message:string | null,data:any | null}>  
	// {
	// 	try {

	// 		// const userWebsite = await UserModel
	// 		return {
	// 			status  : 200, 
	// 			message : null,
	// 			data    : null
	// 		}
	// 		// if (user == null ) return {
	// 		// status : 404, found : false, message : "user doesn't exists!", user: null };
	// 	}
	// 	catch(error) {
	// 		return {
	// 			status  : 500, 
	// 			message : "Something went wrong!",
	// 			data    : null
	// 		}
	// 	}
	// }
	public async deleteWebsite(website_id: string)
	:Promise<{status:number,message:string | null,data:any | null}> 
	 {
		// Get website data
		// Save it !!!
		try {
			return {
				status  : 200, 
				message : null,
				data : null
			}
		}
		catch(error) {
			return {
				status  : 500, 
				message : "Something went wrong!",
				data : null
			}
		}
	}
	public async pushLog( status_code:number, user_id:string, website_id:string )
	:Promise<{status:number,message:string | null,data:any | null}> 
	{
		// Get to know the reasons
		// Push
		try {
			return {
				status  : 200, 
				message : null,
				data : null
			}
		}
		catch(error) {
			return {
				status  : 500, 
				message : "Something went wrong!",
				data : null
			}
		}
	}
	public async getLogs( user_id:string, website_id:string )
	:Promise<{status:number,message:string | null,data:any | null}> 
	{
		try {
			return {
				status  : 200, 
				message : null,
				data : null
			}
		}
		catch(error) {
			return {
				status  : 500, 
				message : "Something went wrong!",
				data : null
			}
		}
	}
	public async deleteLogs( user_id:string, website_id:string | undefined )
	:Promise<{status:number,message:string | null,data:any | null}> 
	{
		try {
			return {
				status  : 200, 
				message : null,
				data : null
			}
		}
		catch(error) {
			return {
				status  : 500, 
				message : "Something went wrong!",
				data : null
			}
		}
	}
	// public getLog( user_id:string, website_id:string ){
		
	// }
	
}

export default CheckWebsitesService;