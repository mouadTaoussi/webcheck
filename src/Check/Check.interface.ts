import { Request,Response } from 'express'
import { websiteType } from '.././Authentication/Authentication.interface';
 
interface CheckWebsiteControllerInterface {
	addWebsite(request:Request,response:Response)        : Promise<void>
	// userWebsites(request:any, response: Response)        : Promise<void>
	deleteWebsite(request:any,response:Response)         : Promise<void>
	websiteLogs(request:Request,response:Response)       : Promise<void>
	deleteWebsiteLogs(request:Request,response:Response) : Promise<void>
	checkEveryWebsiteExists()                            : Promise<void>
};

interface CheckWebsiteServiceInterface {
	/*
		not supported in typescript to put private elements in an interface
	*/
	// websitelogmodel                                                  : any
	// statusCodes                                                      : ServerStatusCodesType<string>
	addWebsite(user_id:string,website: websiteType)                  : Promise<{status:number,message:string | null,data:any | null}> 
	// userWebsites(user_id: string)                                    : Promise<{status:number,message:string | null,data:any | null}> 
	deleteWebsite(user_id:string, website_id: string)                : Promise<{status:number,message:string | null}>
	pushLog( status_code:number, user_id:string, website_id:string ) : Promise<{status:number,message:string | null,data:any | null}>
	getLogs( user_id:string, website_id:string )                     : Promise<{status:number,message:string | null,data:any | null}>
	deleteLogs( user_id:string, website_id:string | undefined )      : Promise<{status:number,message:string | null,data:any | null}>
};

interface WebsiteLog {
	user_id      : string,
	website_id   : string,
	statusCode   : string,
	explanation  : string,
	whenitdown   : string,
	log_id       : string
}

type ServerStatusCodesType<GenericType> = [
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType },
	{ code : number, description : GenericType }

]

export { CheckWebsiteControllerInterface, CheckWebsiteServiceInterface,ServerStatusCodesType, WebsiteLog };

/**
*
* Server Error status codes
*
**/
// 500 Internal Server Error
// A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.[63]
// 501 Not Implemented
// The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).[64]
// 502 Bad Gateway
// The server was acting as a gateway or proxy and received an invalid response from the upstream server.[65]
// 503 Service Unavailable
// The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.[66]
// 504 Gateway Timeout
// The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.[67]
// 505 HTTP Version Not Supported
// The server does not support the HTTP protocol version used in the request.[68]
// 506 Variant Also Negotiates (RFC 2295)
// Transparent content negotiation for the request results in a circular reference.[69]
// 507 Insufficient Storage (WebDAV; RFC 4918)
// The server is unable to store the representation needed to complete the request.[16]
// 508 Loop Detected (WebDAV; RFC 5842)
// The server detected an infinite loop while processing the request (sent instead of 208 Already Reported).
// 510 Not Extended (RFC 2774)
// Further extensions to the request are required for the server to fulfil it.[70]
// 511 Network Authentication Required (RFC 6585)