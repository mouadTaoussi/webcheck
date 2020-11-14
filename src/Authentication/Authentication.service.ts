import UserModel from './Authentication.model';
import WebsiteLogSchema from '../Check/Check.model';
import { AuthenticationServiceInterface, UserBody, UserInterface, UserUpdate,subscriptionObject } from './Authentication.interface'
 
class AuthenticationService implements AuthenticationServiceInterface {

	private usermodel:any;

	// constructor(){
	// 	this.usermodel = UserModel;
	// }
	public async registerToPushService (user_id:string,object:subscriptionObject)
	: Promise<{status:number, saved:boolean,message:string | null}> {
		try {
			// pushRegisteration : new Schema({
			// 	endpoint       : { type: String, required: false, default: null },
			// 	expirationTime : { type : String || Number, default: null },
			// 	keys : new Schema({
			// 		p256dh: { type: String, required: false, default: null },
			//     	auth:   { type: String, required: false, default: null }
			// 	})
			// })
			// Find user
			const user = await UserModel.findByIdAndUpdate(user_id, { pushRegisteration: object });
			// @TODO Add it to the user
			return {
				status : 200, saved : true, message : null, 
			}
		}
		catch(error) {
			return {
				status : 500, saved : false, message  : 'something went wrong! Try again.'
			}
		}
	}
	public async addUser(body : UserBody): Promise<{status:number, saved:boolean,user:any,message:string | null}> {
		try {
			const init_new_user = new UserModel(body);
			const new_user = await init_new_user.save();
			return {
			status : 200, saved : true, message : null, user : new_user }
		}
		catch(error) {
			console.log(error)
			return {
			status : 500, saved : false, message  : 'something went wrong! Try again.', user : null }
		}
	}

	public async findUser(options : {id:string | undefined, email:string | undefined})
	:Promise<{status:number, found:boolean, message:string | null, user:any}> 
	{
		try {
			if (options.id == undefined && options.email != undefined) {

				const user = await UserModel.findOne({email: options.email});

				if (user == null ) return {
				status : 404, found : false, message : "user doesn't exists!", user: null };

				return {
				status : 200, found : true, message: null, user  : user }
			}
			else if (options.id != undefined && options.email == undefined) {

				const user = await UserModel.findById(options.id);

				if (user == null ) return {
				status : 404, found : false, message : "user doesn't exists!", user: null };

				return {
				status : 200, found : true, message: null, user  : user }
			}
			else {  
				return {
				status : 404, found : false, message: 'something went wrong! Try again.',user: null }
			}
		}
		catch(error) {
			console.log(error)
			return {
				status : 500, found : false, 
				message  : 'something went wrong! Try again.', user : null
			}
		}
	}

	public async updateUser(user_id: string, body: UserUpdate)
	:Promise<{status:number, updated:boolean,message:string}> 
	{
		try {
			const user = await UserModel.findByIdAndUpdate(user_id, body);

			return { status : 200, updated : true, message: 'user updated successfully!' }

		}
		catch(error) {
			console.log(error)

			return { 
				status : 500, updated : false, message: 'something went wrong! Try again.' 
			}			
		}
	}

	public async changePassword(id: string, password: string)
	:Promise<{status:number, changed:boolean,message:string}>
	{
		try {
			const user = await UserModel.findByIdAndUpdate(id,{ password: password });
			
			return {
				status : 200, changed : true, message : 'password changed successfully!'
			}
		}
		catch(error) {
			console.log(error)

			return { status : 500, changed : false, message : 'something went wrong! Try again.' }
		}
	}

	public async deleteUser(user_id: string)
	:Promise<{status:number, deleted: boolean,message: string}>
	{
		try {
			// Remove user
			const user = await UserModel.findById(user_id).remove();
			// Delete thier logs
			const logs = await WebsiteLogSchema.find({user_id: user_id});

			for (var i = 0; logs.length > i; i++) {
				await logs[i].remove();
			}

			return { status : 200, deleted : true, message : 'user deleted successfully' }
		}
		catch(error) {
			console.log(error)

			return { status : 500, deleted : false, message : 'something went wrong! Try again.' }
		}
	}
}

export default AuthenticationService;