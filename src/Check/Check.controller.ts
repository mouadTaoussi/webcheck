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
	
	public websiteLogs(request:Request,response:Response) {
		// Get user id and website_id to show thier logs
		// Send the response back
		response.json({message : 'it works!'});
	}
	public checkEveryWebsiteExists(){
		// Get all users
		// Loop
			// get first user
			// Loop
			// check thier websites
				// axios
				// if one of the websites is down
					// send a notification and email
					// nodemailer + webpush
					// push a log to the database 
					// new CheckWebsitesService().pushLog; 
					// status_code:number, user_id:string, website_id:string
				// if not
					// move on

	}

}

// Run <checkEveryWebsiteExists> Job every 2 minutes
const checkWebsitesJob = new CheckWebsiteController().checkEveryWebsiteExists;

setInterval(checkWebsitesJob,60000);

export default CheckWebsiteController;