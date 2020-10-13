import { CheckWebsiteServiceInterface } from './Check.interface';
import WebsiteLogModel from './Check.model';
 
class CheckWebsitesService implements CheckWebsiteServiceInterface{

	private websitelogmodel:any;

	constructor(){
		this.websitelogmodel = WebsiteLogModel;
	}

	public pushLog(){

	}
	public getLogs(){

	}
	public getLog(){
		
	}
	
}

export default CheckWebsitesService;