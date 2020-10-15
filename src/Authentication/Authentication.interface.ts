import { Request,Response, NextFunction } from 'express';

type websiteType = {
	name        : string;
	description : string;
	active      : boolean;
	website     : string;
	_id         : string | undefined;
}

interface UserInterface {
	_id      : string |  undefined;
	name     : string;
	email    : string;
	password : string;
	websites : [

		websiteType | 
		websiteType, websiteType | 
		websiteType, websiteType, websiteType

	] // User should put just 3 websites ! ! !
};
 
interface AuthenticationControllerInterface {
	loginUser      (request:Request, response:Response)  : any;
	registerUser   (request:Request, response:Response)  : any;
	changePassword (request:Request, response:Response)  : any; 
	Authenticated? (request:Request, response:Response, next:NextFunction)  : any;
};

interface AuthenticationServiceInterface {
	findUserById (id   :string)                    : any;
	updateUser   (name :string, email    :string)  : any;
	deleteUser   (id   :string, password :string)  : any;
};

export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface, websiteType };