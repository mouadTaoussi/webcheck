import Router, { Request, Response, NextFunction } from "express";
import AuthenticationController from './Authentication.controller';

const authentication_router = Router();

authentication_router.get('/',(request,response)=>{
	response.json({ message: 'it works!' })
})
 
export default authentication_router;