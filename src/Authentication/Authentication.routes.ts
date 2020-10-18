import Router, { Request, Response, NextFunction } from "express";
import AuthenticationController from './Authentication.controller';

const authentication_router = Router();
const AuthController        = new AuthenticationController();

authentication_router.post('/login',         AuthController.loginUser )
authentication_router.post('/register',      AuthController.registerUser)
authentication_router.post('/resetPassword', AuthController.resetPassword)
authentication_router.get('/updateUser',    AuthController.Authenticated ,AuthController.updateUser)
authentication_router.get('/deleteUser',    AuthController.Authenticated ,AuthController.deleteUser)
// authentication_router.post('/',(request,response)=>{
// 	response.json({ message: 'it works!' })
// })
 
export default authentication_router;