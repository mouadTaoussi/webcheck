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
	receivingEmail: boolean;
	displayTheme  : string;
	websitesCount : number;
	websites      : userWebsites | [];
};
 
interface AuthenticationControllerInterface {
	loginUser      (request:any, response:Response)                   : any;
	registerUser   (request:any, response:Response)                   : any;
	resetPassword  (request:any, response:Response)                   : any; 
	updateUser     (request:any, response:Response)                   : any;
	deleteUser     (request:any, response:Response)                   : any;
	Authenticated  (request:any, response:Response, next:NextFunction): any;
};

interface AuthenticationServiceInterface {
	addUser        (body : UserBody)                                                      :any;                                                    
	findUser       (options : {id:string | undefined, email:string | undefined})          :any;                                                        : any;
	updateUser     (user_id:string, body: { name:string, email:string, active: boolean }) :any;
	changePassword (id: string, password: string)                                         :any;                    
	deleteUser     (user_id:string)                                                       :any;    
};

export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface, websiteType, UserBody };