import { Request, Response,NextFunction } from 'express';

export default function cors(request: Request, response:Response,next:NextFunction){
	response.header("Access-Control-Allow-Origin", '*'); /* https://projectgigs.now.sh*/
	// response.header("Access-Control-Allow-Credentials", true);
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type');
	next();
};
