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

connect(application_config.database_connection,
 
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
			let mailTemplate;

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