import Router, { Request, Response, NextFunction } from "express";
import AuthenticationController from './Authentication.controller';
// import cors from './Authentication.corsPolicy';

const authentication_router = Router();
const AuthController        = new AuthenticationController();

authentication_router.post('/pushServiceRegisteration', /*cors,*/ AuthController.Authenticated,  AuthController.pushServiceRegisteration )
authentication_router.post('/login',                    /*cors,*/ AuthController.loginUser )
authentication_router.post('/register',                 /*cors,*/ AuthController.registerUser)
authentication_router.post('/resetPassword',            /*cors,*/ AuthController.resetPassword)
authentication_router.post('/updateUser',               /*cors,*/ AuthController.Authenticated ,AuthController.updateUser)
// authentication_router.delete('/deleteUser',  AuthController.Authenticated ,AuthController.deleteUser)
// authentication_router.post('/',(request,response)=>{
// 	response.json({ message: 'it works!' })
// })

export default authentication_router;