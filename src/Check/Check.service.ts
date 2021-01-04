import { CheckWebsiteServiceInterface, ServerStatusCodesType, WebsiteLog } from './Check.interface';
import { websiteType, UserInterface } from '.././Authentication/Authentication.interface';
import { WebsiteLogModel, websitesResponsesTimeInDayModel, websiteAverageTimeInDayModel } from './Check.model';
import UserModel from '.././Authentication/Authentication.model';
import { v4, v5 } from 'uuid';
import moment from 'moment';
 
class CheckWebsitesService implements CheckWebsiteServiceInterface{

	private statusCodes       : ServerStatusCodesType<string>;

	constructor(){
		this.statusCodes = [
		{
			code : 404, 
			description : "Might be you entered a wrong website Url" },
		{ 
			code : 500, 
			description : "Internal Server Error" },
		{ 
			code : 501, 
			description : "Not Implemented: The server either does not recognize the request method,or it lacks the ability to fulfil the request." },
		{ 
			code : 502, 
			description : "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream." },
		{ 
			code : 503, 
			description : "Service Unavailable: The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state." },
		{ 
			code : 504, 
			description : "Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server." },
		{ 
			code : 505, 
			description : "HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request." },
		{ 
			code : 506, 
			description : "Variant Also Negotiates (RFC 2295): Transparent content negotiation for the request results in a circular reference." },
		{ 
			code : 507, 
			description : "Insufficient Storage (WebDAV; RFC 4918): The server is unable to store the representation needed to complete the request." },
		{ 
			code : 509, 
			description : "Loop Detected (WebDAV; RFC 5842): The server detected an infinite loop while processing the request (sent instead of 208 Already Reported)." },
		{ 
			code : 510, 
			description : "Not Extended (RFC 2774): Further extensions to the request are required for the server to fulfil it." },
		{ 
			code : 511, 
			description : "Network Authentication Required (RFC 6585)." 
		}
		]
	}

	public async addWebsite(user_id:string,website: websiteType)
	:Promise<{status:number,message:string | null,data:any | null}> 
	 {
		// Get website data
		// Save it !!!
		try {
			// Find the user
			const user: UserInterface | any = await UserModel.findOne({_id:user_id});

			// Check his websitesCount 
			if (user.websitesCount < 3 ) {

				// Get him websites
				const userWebsites: [websiteType] | any = user.websites;

				// Increase websitesCount by one, so we can limit users websites 
				const plusOne: number = user.websitesCount + 1;

				// Set to true by default
				website.active = true;

				// Push the new website to the current websites array
				userWebsites.push(website);

				// Increase websitesCount then Save it to the database
				const update: UserInterface | any = await UserModel.findByIdAndUpdate(user_id,{
					websitesCount : plusOne, 
					websites      : userWebsites
				}, {new: true})

				// Get the website id
				const website_id : string | undefined = update.websites[update.websites.length-1]._id;

				// @TODO Add response times in day Document
				const addResponseTimesDocument = new websitesResponsesTimeInDayModel({
					website_id : website_id,
					user_id    : user_id,
					response_times_melliseconds : []
				})
				await addResponseTimesDocument.save();
				console.log(addResponseTimesDocument)
				// @TODO Add average response time last ten days Document
				const addAverageResponseTimeDocument = new websiteAverageTimeInDayModel({
					website_id : website_id,
					user_id    : user_id,
					website_name : website.name,
					website_speed_last_ten_days : []
				})
				await addAverageResponseTimeDocument.save();
				console.log(addAverageResponseTimeDocument)
				// 
				return { 
					status : 200, message : 'A new website added!!', data : website }
			}
			else {
				return {
					status  : 200, message : 'You cannot add more than 3 websites!!',
					data : null }
			}
		} catch(error) {
			console.log("error")
			console.log(error)
			return {
				status  : 500, message : "Something went wrong!", data : null }
		}
	}

	public async deleteWebsite(user_id:string,website_id: string)
	:Promise<{status:number,message:string | null}> 
	 {
		try {
			// Get website data
			const user: UserInterface | any = await UserModel.findOne({_id:user_id});

			// Get user websites
			const websites: [websiteType] | any = user.websites;

			// Websites without the targeted one to be deleted
			let websitesNotDeleted: [websiteType] | [] | any = [];

			// Remove the target website
			for (var i = 0; i < websites.length; i++) {

				if ( websites[i]._id.toString() == website_id.toString() ) {
					continue;
				}
				else {
					websitesNotDeleted.push(websites[i]);
				}
			}

			// @TODO Remove website logs
			// @TODO Remove response times in day
			await websitesResponsesTimeInDayModel.findOne({website_id: website_id}).remove();
			// @TODO Remove average response time last ten days
			await websiteAverageTimeInDayModel.findOne({website_id: website_id}).remove();

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
		// Get to know the reason
		const explanation : { code:number, description:string } = this.statusCodes.filter((statuscode)=>{
			return statuscode.code == status_code;
		})[0];

		const saving = new WebsiteLogModel({
			user_id     : user_id,
			website_id  : website_id,
			status_code : status_code,
			explanation : explanation.description,
			whenitdown  : moment().format('MMMM Do YYYY, h:mm:ss a'),
			log_id      : v4()
		})

		try {
			// Push
			await saving.save();

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
			const user: UserInterface | any = await UserModel.findOne({_id:user_id});

			// Get logs of each website
			let logs: [WebsiteLog] | any = await WebsiteLogModel.find({
				user_id: user._id
			});

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
			// Delete thier logs
			const logs = await WebsiteLogModel.find({user_id: user_id});

			for (var i = 0; logs.length > i; i++) {
				await logs[i].remove();
			}
			// console.log(deleting)
			return { status  : 200, message : "Logs has been deleted successfully", data : null }
		}
		catch(error) {
			return { 
				status  : 500,  message : "Something went wrong!", data : null
			}
		}
	}	


	// Get responsesTime for each website
	public async getResponsesTimesForWebsites () : Promise<{status:number,data:any}>
	{
		try {

			//
			const websites_response_times = await websitesResponsesTimeInDayModel.find({});
			return {
				status : 200, data : websites_response_times
			}
		}
		catch (err) {
			return {
				status : 500, data   : null
			}
		}
	}
	// Get average time for a website
	public async getAverageTimeForWebsite (website_id: any, user_id: any) : Promise<{status:number,data:any}>
	{
		try {

			let websiteAverageTimeInDay: any;
			//
			if (website_id != undefined && user_id == undefined)
			{
				websiteAverageTimeInDay = await websiteAverageTimeInDayModel.findOne({website_id:website_id});
			}
			else if (website_id == undefined && user_id != undefined)
			{
				websiteAverageTimeInDay = await websiteAverageTimeInDayModel.find({user_id:user_id});
			}

			return {
				status : 200, data : websiteAverageTimeInDay
			}
		}
		catch (err) {
			return {
				status : 500, data   : null
			}
		}
	}
	// Push response time for website
	public async pushResponseTimeForWebsite(website_id:string, responseTime:number) 
	:Promise<{status:number,message: string}> {
		try {
			// websitesResponsesTimeInDayModel, websiteAverageTimeInDayModel
			let websitesResponsesTimeInDay :any = await websitesResponsesTimeInDayModel.findOne({website_id:website_id});
			// Push respsone time value
			websitesResponsesTimeInDay.response_times_melliseconds.push(responseTime);
			// Save it!
			await websitesResponsesTimeInDay.save();
			//
			return {
				status : 200, message : "Saved!"
			}
		}
		catch (err){
			return {
				status : 500, message : "Something went wrong!"
			}
		}

	}
	// Push average response entity for the current day to the array
	public async pushAverageResponseForToday(website_id:string,entitiy : { date:string,average_melliseconds:number }) 
	:Promise<{ status:number, message: string }> {
		try {
			// Will be NaN if the website is down because there is no responseTime about it
			if (isNaN(entitiy.average_melliseconds)){
				entitiy.average_melliseconds = 0;
			}
			// websitesResponsesTimeInDayModel, websiteAverageTimeInDayModel
			let websiteAverageTimeInDay :any = await websiteAverageTimeInDayModel.findOne({website_id:website_id});
			// Push respsone time value
			websiteAverageTimeInDay.website_speed_last_ten_days.push(entitiy);
			// console.log(websiteAverageTimeInDay)
			// Save it!
			await websiteAverageTimeInDay.save();
			//
			return {
				status : 200, message : "Saved!"
			}
		}
		catch (err){
			// console.log(err)
			return {
				status : 500, message : "Something went wrong!"
			}
		}

	}
	// Pop first and older average response entity for the if the entities reached to 10 long
	public async popOlderEntity(website_id:string) 
	:Promise<{ status:number, message: string }> {
		try {
			// websitesResponsesTimeInDayModel, websiteAverageTimeInDayModel
			let websiteAverageTimeInDay :any = await websiteAverageTimeInDayModel.findOne({website_id:website_id});
			// Push respsone time value
			const entities: [{date:string,average_melliseconds:number}] 
			= websiteAverageTimeInDay.website_speed_last_ten_days;

			// Delete older one
			let entitiesOutput = [];
			for (var i = 0; entities.length > i; i++) {
				if ( i == 0 ) { continue }
				else {
					entitiesOutput.push(entities[i]);
				}
			}
			websiteAverageTimeInDay.website_speed_last_ten_days = entitiesOutput;
			await websiteAverageTimeInDay.save();
			//
			return {
				status : 200, message : "Deleted!"
			}
		}
		catch (err){
			return {
				status : 200, message : "Deleted!"
			}
		}

	}
	// clear responses time for the day
	public async clearResponseTimesForWebsite(website_id:string) 
	:Promise<{ status:number, message: string }> {
		try {
			// websitesResponsesTimeInDayModel, websiteAverageTimeInDayModel
			let websitesResponsesTimeInDay: any = await websitesResponsesTimeInDayModel.findOne({website_id:website_id});

			// Clear it!
			websitesResponsesTimeInDay.response_times_melliseconds = [];
			// Save it!
			await websitesResponsesTimeInDay.save();
			//
			return {
				status : 200, message : "Deleted!"
			}
		}
		catch (err){
			return {
				status : 200, message : "Deleted!"
			}
		}

	}

}

export default CheckWebsitesService;