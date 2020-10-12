import UserModel from './Authentication.model';
import { AuthenticationServiceInterface } from './Authentication.interface'

class AuthenticationService implements AuthenticationServiceInterface{

	private usermodel:any;

	constructor(){
		this.usermodel = UserModel;
	}

	public findUser() {

	}
	public updateUser(){

	}
	public deleteUser(){
		
	}
}

export default AuthenticationService;