import CheckWebsitesService from './Check.service';
import { CheckWebsiteControllerInterface } from './Check.interface';
import axios from 'axios';
import { Request,Response } from 'express';
 

class CheckWebsiteController implements CheckWebsiteControllerInterface{

	private websitesLogService: any;

	constructor(){
		this.websitesLogService = new CheckWebsitesService();
	}

	public websiteLogs(request:Request,response:Response) {
		response.json({message : 'it works!'});
	}

}

export default CheckWebsiteController;