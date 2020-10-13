import { Request,Response, NextFunction } from 'express';

type websiteType = {
	website  : string;
	_id      : string | undefined
}

interface UserInterface {
	_id      : string |  undefined;
	name     : string;
	email    : string;
	password : string;
	websites : [websiteType, websiteType, websiteType] // User should put just 3 websites ! ! !
};
 
interface AuthenticationControllerInterface {
	loginUser      (request:Request,response:Response)  : any;
	registerUser   (request:Request,response:Response)  : any;
	changePassword (request:Request,response:Response)  : any; 
	Authenticated? (request:Request,response:Response,next:NextFunction)  : any;
};

interface AuthenticationServiceInterface {
	findUser()    : any;
	updateUser()  : any;
	deleteUser()  : any;
};

export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface };