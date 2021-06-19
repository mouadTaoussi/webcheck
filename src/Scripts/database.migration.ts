/**
*
* This file runs separatly a proccess to update the databsae with the latest models and fields
* This file doesnt store any database changelog or so, you need to use a specific migration library
* to do that job for you
*
**/
import { WebsiteLogModel, websitesResponsesTimeInDayModel, websiteAverageTimeInDayModel } from '.././Check/Check.model';
import UserModel from '.././Authentication/Authentication.model';
import { connect } from 'mongoose';
import application_config from '.././main.config';

connect(application_config.database_connection!,
 
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
	,(error:any)=>{
	if (error){
		console.log(error);
	}else {
		console.log('Database up and running!');
	}

});

interface Migration {
	up(): Promise<void>
	down(): Promise<void>
}

class Migration implements Migration {
	public async up(): Promise<void> {
		// const website_ids = [];
		// Get all users
		const users : any = await UserModel.find({});

		// Create websitesResponsesTimeInDayModel and websiteAverageTimeInDayModel for each website
		for (var i = 0; i < users.length; i++) {
			for (var io = 0; io < users[i].websites.length; io++) {
				// code...
				// website_ids.push(users[i].websites[io]._id)
				const WRTID = await websitesResponsesTimeInDayModel.findOne({user_id:users[i]._id, website_id:users[i].websites[io]._id});
				const WATID = await websiteAverageTimeInDayModel.findOne({user_id:users[i]._id, website_id:users[i].websites[io]._id});
				// console.log(WRTID)
				if (WRTID == null) {
					const newInstance = new websitesResponsesTimeInDayModel({
						user_id : users[i]._id,
						website_id : users[i].websites[io]._id,
						response_times_melliseconds : []
					})
					await newInstance.save();
				}
				else {
					// continue;
				}
				if (WATID == null) {
					const newInstance = new websiteAverageTimeInDayModel({
						user_id : users[i]._id,
						website_id : users[i].websites[io]._id,
						website_name : users[i].websites[io].name,
						website_speed_last_ten_days: []

					})
					await newInstance.save();
				} 
				else {
					// continue;
				}
			}
		}
	}
	public async down(): Promise<void> {

	}
} 

// Execution
new Migration().up();

setTimeout(()=>{
	process.exit(0); 
},60000)