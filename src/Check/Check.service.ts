import { CheckWebsiteServiceInterface, ServerStatusCodesType } from './Check.interface';
import { websiteType } from '.././Authentication/Authentication.interface';
import WebsiteLogModel from './Check.model';
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

	addWebsite(website: websiteType) {
		// Get website data
		// Save it !!!
		try {

		}
		catch(error:any) {
			return {
				status  : 500, 
				message : "Something went wrong!"
			}
		}
	}
	public pushLog( status_code:number, user_id:string, website_id:string ){
		// Get to know the reasons
		// Push
		try {

		}
		catch(error:any) {
			return {
				status  : 500, 
				message : "Something went wrong!"
			}
		}
	}
	public getLogs( user_id:string, website_id:string ){
		try {

		}
		catch(error:any) {
			return {
				status  : 500, 
				message : "Something went wrong!"
			}
		}
	}
	public deleteLogs( user_id:string, website_id:string ){
		try {

		}
		catch(error:any) {
			return {
				status  : 500, 
				message : "Something went wrong!"
			}
		}
	}
	// public getLog( user_id:string, website_id:string ){
		
	// }
	
}

export default CheckWebsitesService;