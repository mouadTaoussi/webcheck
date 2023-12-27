import express , { Application, Request, Response } from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import "cookie-session";
import { connect } from "mongoose";
import application_config from "./main.config";
import xss from 'xss';
import cors from './main.cors';
import helmet from "helmet";
import bodyParser from 'body-parser';
import 'reflect-metadata';
// Routes  
import website_logs_router from './Check/Check.routes';
import authentication_router from './Authentication/Authentication.routes';
// Jobs 
import './Check/Check.scheduledjobs';
// GraphQL 
import { websiteResolver } from './GraphQL/main.graphql';

const MODE:string = process.env.INDEV == "development" ? "development" : "production";

async function runapp(){

	var app: Application = express();

	const ServerOfApollo: any = new ApolloServer({
		schema: await buildSchema({
			resolvers : [ websiteResolver ],
			validate: true
		}),
		// context: '',
		context: ({ req, res }) => ({ req, res }),
		playground : true,
	})
	ServerOfApollo.applyMiddleware({ app , cors: { 
		origin: application_config.front_end_origin, 
		credentials: true,
		methods: ["POST","OPTIONS"],
	} });

	// Routes
	if (application_config.port_dev == 'developement'){
		app.use('/',express.static(  __dirname + "/../wc-front-end/dist"));
	}else {
		app.get('/',(req:Request, res:Response)=>{
			res.redirect('https://webcheck.vercel.app');
		});
	}
	
	
	app.use(helmet());
	app.use(bodyParser.json());

	app.use('/auth',  cors, authentication_router);
	app.use('/check', cors, website_logs_router);

	// Connect to database
	connect(application_config.database_connection!,

		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
		,(error:any)=>{
		if (error){
			console.log(error);
		}else {
			console.log('Database up and running!');
		}

	});

	// Set up the port
	const PORT : number | string | undefined 
		= application_config.port_dev || application_config.port;

	app.listen(PORT);
	console.log("Server up and running at " + MODE + " mode at port " + PORT);
}
runapp();
