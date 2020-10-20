import express , { Application } from "express";
import "cookie-session";
import { connect } from "mongoose";
import application_config from "./main.config";
import xss from 'xss';
import helmet from "helmet";
import bodyParser from 'body-parser';
// Routes 
import website_logs_router from './Check/Check.routes';
import authentication_router from './Authentication/Authentication.routes';

 
var application: Application = express();

// application.use(xss);
application.use(helmet());
application.use(bodyParser.json());

connect(application_config.mongodb_connection,
	{ useNewUrlParser: true, useUnifiedTopology: false }
	,(error:any)=>{
	if (error){
		console.log(error);
	}else {
		console.log('Database up and running!');
	}
});

application.use('/auth',         authentication_router);
application.use('/checkwebsite', website_logs_router);


application.listen(8000);