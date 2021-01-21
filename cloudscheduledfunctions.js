const axios = require('axios')
const webpush = require('web-push');
const nodemailer = require('nodemailer');
const moment = require('moment');
// const mongodbIntegration 


function handlePushAndEmail(registeration, options){
	//  // init payload
	const payload  = {
		title: options.message,
		url  : options.url
	}
	//  // send a notification and email
	webpush.sendNotification(
		registeration,JSON.stringify(payload)
	) 
	// @TODO : check if he'is allowed to send emails to him
	if (!options.receiving_email) return;
	// nodemailer
	// Create transporter object with credentials
	var transporter = nodemailer.createTransport({
		service :'gmail',
		auth: { user: "mouadtaoussi0", pass: "application_config.password" }
	});
	// Check the language the user set in the app to send the email appropriated to his language
	let mailTemplate  = `
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
function checkEveryWebsiteExists() {
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
					const checking = await axios({
					method : 'GET',
					url : users.user[i].websites[o].website,
					headers : {
						// 'Content-Type': 'text-html',
						"access-control-allow-origin": "*",
					}
					})
					// @TODO Push time in melliseconds
					const responseTime = checking.duration;
					const pushing = await websiteService.pushResponseTimeForWebsite(users.user[i].websites[o]._id,responseTime);
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
					const checking = await axios({
						method : 'GET',
						url : users.user[i].websites[o].website,
						headers : {
							// 'Content-Type': 'text-html',
							"access-control-allow-origin": "*",
						}
					})
					// @TODO Push time in melliseconds
					const responseTimes = checking.duration;
					const pushing = await websiteService.pushResponseTimeForWebsite(users.user[i].websites[o]._id,responseTime);
					
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
function calculateAverageResponseOfWebsite() {
	// loop over <websitesResponsesTime>
	const responsesTime = await websiteService.getResponsesTimesForWebsites();

	for (var i = 0; i < responsesTime.data.length; i++ ){
		var sum = 0;
		var average = 0;
		
		// Get user id and the website id
		const user_id = responsesTime.data[i].user_id;
		const website_id = responsesTime.data[i].website_id;
		
		// Sum the melliseconds
		for (var io = 0; io < responsesTime.data[i].response_times_melliseconds.length; ++io) {
			// code...
			sum += responsesTime.data[i].response_times_melliseconds[io];
		}
		// Calculate the average
		average = Math.floor(sum / responsesTime.data[i].response_times_melliseconds.length);

		// add new entity with the average calculated in the <websiteAverageTimeInDay>
		const entity = { date: moment().subtract(1, 'days').format('L'), average_melliseconds:average };

		const addIt = await websiteService.pushAverageResponseForToday(website_id, entity);

		// make the current <websitesResponsesTime.response> empty
		const deleteResponsesTime = await websiteService.clearResponseTimesForWebsite(website_id);

		// Implement queue to delete the first entity if the long reached to 10
		const averageEntities = await websiteService.getAverageTimeForWebsite(website_id, undefined);
		// console.log(averageEntities.data.website_speed_last_ten_days.length)
		if ( averageEntities.data.website_speed_last_ten_days.length > 10 ) {
			const popOlderEntity = await websiteService.popOlderEntity(website_id);
		}else  { continue; }
	}
}

checkEveryWebsiteExists()
calculateAverageResponseOfWebsite()