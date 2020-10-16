import UserModel from './Authentication.model';
import { AuthenticationServiceInterface, UserBody } from './Authentication.interface'
 
class AuthenticationService implements AuthenticationServiceInterface {

	private usermodel:any;

	constructor(){
		this.usermodel = UserModel;
	}
	public async addUser(body : UserBody) {
		try {
			const init_new_user = new UserModel(body);
			const new_user = await init_new_user.save();

			return {
				found : false,
				user : new_user
			}
		}
		catch(error) {
			return {
				found : false,
				message  : 'something went wrong! Try again.',
				user : null
			}
		}
	}

	public async findUser(options : {id:string | undefined, email:string | undefined}) {
		try {
			if (options.id == undefined && options.email != undefined) {

				const user = await UserModel.findOne({email: options.email});

				if (user == null ) return { found : false, message : "user doesn't exists!" };

				return { found : true, user  : user }
			}
			else if (options.id != undefined && options.email == undefined) {

				const user = await UserModel.findById(options.id);

				if (user == null ) return { found : false, message : "user doesn't exists!" };

				return { found : true, user  : user }
			}
			else {  
				return { found : false, message: 'something went wrong! Try again.' }
			 }
		}
		catch(error) {
			return {
				found : false,
				message  : 'something went wrong! Try again.'
			}
		}
	}
	public async updateUser(user_id: string, body: { name:string, email:string, active: boolean }){
		try {
			const user = await UserModel.findById(user_id);

			// Updating
			user.name    = body.name;
			user.email   = body.email;
			user.active  = body.active;

			// then save the user
			await user.save();

			return {updated : true, message: 'user updated successfully!' }

		}
		catch(error) {
			return {
				updated : false, message: 'something went wrong! Try again.' 
			}			
		}
	}
	public async changePassword(email: string, password: string){
		try {
			const user = await UserModel.findOne({email: email});

			// Change password
			user.password = password;

			return {
				changed : true,
				message : 'password changed successfully!'
			}
		}
		catch(error) {
			return {
				changed : false,
				message : 'something went wrong! Try again.'
			}
		}
	}
	public async deleteUser(user_id: string){
		try {
			const user = await UserModel.findById(user_id).remove();
			// Delete thier logs
			return {
				deleted : true,
				message : 'user deleted successfully'
			}
		}
		catch(error) {
			return {
				deleted : false,
				message : 'something went wrong! Try again.'
			}
		}
	}
}

export default AuthenticationService;