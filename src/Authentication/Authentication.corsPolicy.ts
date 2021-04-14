import { Request, Response, NextFunction } from 'express';

export default function cors(request: Request, response:any,next:NextFunction){

	response.header("Access-Control-Allow-Origin", 'https://webcheck.vercel.app'); /* https://projectgigs.now.sh*/
	response.header("Access-Control-Allow-Credentials", true);
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Content-Type,Authorization');
	next();

};