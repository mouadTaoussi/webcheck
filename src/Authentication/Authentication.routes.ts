import Router, { Request, Response, NextFunction } from "express";
import AuthenticationController from './Authentication.controller';

const authentication_router = Router();
const AuthController        = new AuthenticationController();

authentication_router.post('/login',         AuthController.loginUser )
authentication_router.post('/register',      AuthController.registerUser)
authentication_router.post('/resetPassword', AuthController.resetPassword)
// authentication_router.post('/',(request,response)=>{
// 	response.json({ message: 'it works!' })
// })
 
export default authentication_router;