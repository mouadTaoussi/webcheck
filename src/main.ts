import express , { Application, Request, Response } from "express";
import "cookie-session";
import { connect } from "mongoose";
import application_config from "./main.config";
import xss from 'xss';
import cors from './Authentication/Authentication.corsPolicy';
import helmet from "helmet";
import bodyParser from 'body-parser';
// Routes  
import website_logs_router from './Check/Check.routes';
import authentication_router from './Authentication/Authentication.routes';
import dotenv from 'dotenv'; 

dotenv.config({ path: './.env' })

var application: Application = express();

application.use('/',express.static("../wc-front-end/dist"));
application.use(helmet());
application.use(bodyParser.json());

application.use('/auth',  cors, authentication_router);
application.use('/check', cors, website_logs_router);

connect(application_config.database_connection,

	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
	,(error:any)=>{
	if (error){
		console.log(error);
	}else {
		console.log('Database up and running!');
	}

});

const PORT : number | string | undefined 
	= process.env.PORT_DEV || process.env.PORT;

application.listen(PORT);
console.log("Server up and running at port " + PORT);
