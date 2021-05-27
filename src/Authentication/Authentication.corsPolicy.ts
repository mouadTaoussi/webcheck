import { Request, Response, NextFunction } from 'express';
import application_config from '../main.config';

export default function cors(request: Request, response:any, next:NextFunction){

	response.header("Access-Control-Allow-Origin", application_config.front_end_origin);
	response.header("Access-Control-Allow-Credentials", true);
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Content-Type,Authorization');
	next();

};