"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_model_1 = __importDefault(require(".././Authentication/Authentication.model"));
const mongoose_1 = require("mongoose");
const main_config_1 = __importDefault(require(".././main.config"));
const nodemailer_1 = require("nodemailer");
mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
class EmailService {
    async sendEmails() {
        const users = await Authentication_model_1.default.find({});
        for (var i = 0; i < users.length; i++) {
            const userEmail = users[i].email;
            var transporter = nodemailer_1.createTransport({
                service: 'gmail',
                auth: { user: main_config_1.default.email, pass: main_config_1.default.password }
            });
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
					</head>
					<body>
						<div class="container">
							<header class="header">
								<img class="image" src="https://webcheck1.herokuapp.com/img/logo_light.9d3a344c.svg">
							</header>
							<div>
								<p class="greetings" >Hello ${users[i].name}</p>
								<h1 class="title">New Features and fixes are released!</h1>
								<p class="text">these days! we worked on this app to improve its functionality and fixing problems! there are improvment below!</p>
								<div class="doted-list">
									<ul>
										<li>You can get status about your website speed and performance represented in graph last ten days.</li>
										<li>A problem related to notifications is fixed</li>
										<li>Tha app is now in at new domain! <a href="https://webcheck.vercel.app">New domain</a></li>
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
							</style>
						</div>
					</body>
					</html>
			`;
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
setTimeout(() => {
    process.exit(0);
}, 60000);
