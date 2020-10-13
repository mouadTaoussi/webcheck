import { Request,Response } from 'express';

type websiteType = {
	website  : string;
	_id      : string | undefined
}

interface UserInterface {
	name     : string;
	email    : string;
	password : string;
	websites : [websiteType, websiteType, websiteType] // User should put just 3 websites ! ! !
};
 
interface AuthenticationControllerInterface {
	loginUser      (request:Request,response:Response)  : any;
	registerUser   (request:Request,response:Response)  : any;
	changePassword (request:Request,response:Response)  : any; 
	Authenticated? (request:Request,response:Response)  : any;
};

interface AuthenticationServiceInterface {
	findUser()    : any;
	updateUser()  : any;
	deleteUser()  : any;
};

export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface };