/**
*
* 
* This file runs separatly a proccess to send emails to the users telling them about the latest features
* 
*
**/
import UserModel from '.././Authentication/Authentication.model';
import { connect } from 'mongoose';
import application_config from '.././main.config';
import { createTransport } from 'nodemailer';

connect( application_config.database_connection!,
 
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
	,(error:any)=>{
	if (error){
		console.log(error);
	}else {
		console.log('Database up and running!');
	}

});

interface EmailService {
	sendEmail () : Promise<void>
}

class EmailService implements EmailService {
	public async sendEmails(){
		// Get all of the users 
		const users = await UserModel.find({});
		// Send email to each one f them
		for (var i = 0; i < users.length; i++) {
			// code...
			const userEmail = users[i].email;
			// Send email
			var transporter = createTransport({
				service :'gmail',
				auth: { user: application_config.email, pass: application_config.password }
			});
			// Check the language the user set in the app to send the email appropriated to his language
			let mailTemplate = `
				<!DOCTYPE html>
					<html>
					<head>
						<title>Features</title>
						<style>
							@font-face {
							    font-family: poppins;
							    src: url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Ubuntu:wght@400;500&display=swap");
							}
						</style>
						<style>
							body {
								background-color: rgba(0,0,0,.1);
								font-family: tahoma,verdana,Courier,helvetica;
							}
							.image {
								width: 200px;
								height: 100px;
							}
							.container {
								width: 80%;
								/*height: 500p*/
								padding: 20px;
								margin: 0 auto;
								background-color: white;

							}
							.doted-list ul {
								padding-left: 20px;
							}
							.doted-list ul li {
								margin-top: 10px;
							}
							.greetings {
								font-family: Courier;
								font-weight: bolder;
								font-size: 20px;
								margin: 0;
								color: rgba(0,0,0,.7);

							}
							.title, .text {
								margin: 0;
							}
							.header {

							}
							.footer ul {
								margin-top: 10px;
								padding-left: 0;
								list-style: none;
							}
							.footer ul li {
								display: inline;
								margin: 10px;
							}
							.link {
								color: rgba(0,0,0,.5);
								text-decoration: none;
							}
							.image-logo {
								background-image : url('https://webcheck.vercel.app/img/logo_light.9d3a344c.svg');
								background-repeat: no-repeat;
								background-position: center;
								background-size: contain;
								width: 200px;
								height: 100px;
							}
						</style>
					</head>
					<body>
						<div class="container">
							<header class="header">
							</header>
							<div>
								<p class="greetings" >Hello ${users[i].name}</p>
								<h1 class="title">New Features and fixes are released!</h1>
								<p class="text">these days! we worked on this app to improve its functionality, adding featurues and fixing problems! there are some of the improvments below!</p>
								<div class="doted-list">
									<ul>
										<li>You can get status about your website speed and performance represented in graph last ten days.</li>
										<li>The app is now in at new domain! <a href="https://webcheck.vercel.app">New domain</a></li>
										<li>Fixed a problem that stop notification to be sent</li>
										<li>Fixed the downtime problem</li>
									</ul>
								</div>
								<div class="footer">
									<ul>
										<li>
											<a class="link" href="https://webcheck.vercel.app/#/privacypolicy">
												Privacy and policy
											</a>
										</li>
										<li>
											<a class="link" href="https://webcheck.vercel.app/#/dashboard">
												Open app
											</a>
										</li>
										<li>
											<a class="link" href="https://webcheck.vercel.app/#/about">
												About
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</body>
				</html>
			`;

			// send it!
			transporter.sendMail({
				from: '"WebCheck Team" <mouadtaoussi0@gmail.com>',
			    to: userEmail,
			    subject: 'Now you can see your website speed!',
			    text: 'Hey there, it’s your link to change your password below ;) ', 
			    html: mailTemplate
			});
		}
	}
}

new EmailService().sendEmails();

setTimeout(()=>{ 
	process.exit(0);
},60000)