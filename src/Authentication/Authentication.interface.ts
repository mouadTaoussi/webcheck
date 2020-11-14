import { Request,Response, NextFunction } from 'express';

// Used to save a new website
type websiteType = {
	name        : string;
	description : string;
	active      : boolean |undefined;
	website     : string;
	_id         : string | undefined;
} 
type userWebsites = [

	websiteType | 
	websiteType, websiteType | 
	websiteType, websiteType, websiteType

] // User should put just 3 websites ! ! !

// @TODO : add subscriptionObject model from push service
interface subscriptionObject {
	endpoint: string,
	expirationTime : unknown,
	keys: {
	    p256dh: string,
	    auth: string
    }
}

// Used to register a new user
interface UserBody {
	name          : string; 
	email         : string;
	password      : string;
	password2     : string;
	active        : boolean;
	websitesCount : number;
	websites      : userWebsites | [] // [] will be deleted  ! ! !
	// @TODO : add subscriptionObject model from push service and not required
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
	// @TODO : add subscriptionObject model from push service
};
 
// Used body user to update his profile
interface UserUpdate { 
	name: string, 
	email: string, 
	receivingEmail:string 
	active: boolean, 
	displayTheme:string,
}

// Interface used to describe authentication controller methods ! ! !
interface AuthenticationControllerInterface {
	pushServiceRegisteration(request: any,response:Response)          : Promise<void>
	loginUser      (request:any, response:Response)                   : Promise<void>
	registerUser   (request:any, response:Response)                   : Promise<void>
	resetPassword  (request:any, response:Response)                   : Promise<void> 
	updateUser     (request:any, response:Response)                   : Promise<void>
	deleteUser     (request:any, response:Response)                   : Promise<void>
	Authenticated  (request:any, response:Response, next:NextFunction): Promise<void>
};

// Interface used to describe authentication service methods
interface AuthenticationServiceInterface {
	registerToPushService (user_id:string,object:subscriptionObject)                      :Promise<{status:number, saved:boolean,message:string | null}>
	addUser        (body : UserBody)                                                      :Promise<{status:number, saved:   boolean, user:any,message:string | null}>;                                                    
	findUser       (options : {id:string | undefined, email:string | undefined})          :Promise<{status:number, found:   boolean, message:string | null, user:any}>;
	updateUser     (user_id:string, body: { name:string, email:string, active: boolean }) :Promise<{status:number, updated: boolean, message:string}> ;
	changePassword (id: string, password: string)                                         :Promise<{status:number, changed: boolean, message:string}>;                    
	deleteUser     (user_id:string)                                                       :Promise<{status:number, deleted: boolean, message: string}>;    
};

export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface, websiteType, UserBody, UserUpdate, subscriptionObject };