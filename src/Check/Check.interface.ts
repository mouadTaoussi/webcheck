import { Request,Response } from 'express'
import { websiteType } from '.././Authentication/Authentication.interface';
 
interface CheckWebsiteControllerInterface {
	addWebsite(request:Request,response:Response)   : any
	websiteLogs(request:Request,response:Response)  : any
};

interface CheckWebsiteServiceInterface {
	/*
		not supported in typescript to put private elements in an interface
	*/
	// websitelogmodel                                                  : any
	// statusCodes                                                      : ServerStatusCodesType<string>
	addWebsite(website: websiteType)                                 :any
	pushLog( status_code:number, user_id:string, website_id:string ) : any
	getLogs( user_id:string, website_id:string )                     : any
	deleteLogs( user_id:string, website_id:string )                  : any
};

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

export { CheckWebsiteControllerInterface, CheckWebsiteServiceInterface,ServerStatusCodesType };

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