import AuthenticationService from './Authentication.service';
import { AuthenticationControllerInterface } from './Authentication.interface';
import { sign, verify, decode } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Request,Response } from 'express';


class AuthenticationController implements AuthenticationControllerInterface{

	private userService: any;

	constructor(){
		this.userService = new AuthenticationService();;
	}

	public loginUser(request:Request,response:Response) {
		response.json({message : 'it works!'});
	}
	public registerUser(request:Request,response:Response) {

	}
	public changePassword(request:Request,response:Response) {

	}
	public Authenticated?(request:Request,response:Response){

	}
}

export default AuthenticationController;