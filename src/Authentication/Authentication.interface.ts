import { Request,Response, NextFunction } from 'express';

// Used to save a new website
type websiteType = {
	name        : string;
	description : string;
	active      : boolean;
	website     : string;
	_id         : string | undefined;
} 
type userWebsites = [

	websiteType | 
	websiteType, websiteType | 
	websiteType, websiteType, websiteType

] // User should put just 3 websites ! ! !

// Used to register a new user
interface UserBody {
	name          : string; 
	email         : string;
	password      : string;
	password2     : string;
	active        : boolean;
	websitesCount : number;
	websites      : userWebsites | [] // [] will be deleted  ! ! !
}

// Get user from database
interface UserInterface {
	_id           : string |  undefined;
	name          : string;
	email         : string;
	password      : string | undefined;
	active        : boolean;
	websitesCount : number;
	websites      : userWebsites | [];
};
 
interface AuthenticationControllerInterface {
	loginUser      (request:Request, response:Response)  : any;
	registerUser   (request:Request, response:Response)  : any;
	resetPassword  (request:Request, response:Response)  : any; 
	Authenticated? (request:Request, response:Response, next:NextFunction)  : any;
};

interface AuthenticationServiceInterface {
	addUser      (body : UserBody)                                                      
	findUser     (options : {id:string | undefined, email:string | undefined})                                                           : any;
	updateUser   (user_id:string, body: { name:string, email:string, active: boolean }) 
	deleteUser   (user_id:string)                                     
};

export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface, websiteType, UserBody };