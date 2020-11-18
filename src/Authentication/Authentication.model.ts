import { Schema, model } from "mongoose";

const userWebsiteSchema = new Schema({
	name          : { type : String }, // a name given for the website
	description   : { type : String }, // a description of that website
	active        : { type : Boolean }, // if the website is working then <true>, if down then <false>
	website       : { type : String }  // Website Url
})

// > Deparceted
const keysSchema = new Schema({
	p256dh: { type: String, required: true, default: null },
	auth:   { type: String, required: true, default: null }
})

const pushSubscriptionSchema = new Schema({
	endpoint       : { type: String, required: true, default: null },
	expirationTime : { type : String || Number, default: null },
	keys : keysSchema
})
// <

const UserSchema = new Schema({
	name          : { type: String,  required: true },
	email         : { type: String,  required: true },
	password      : { type: String,  required: true },
	active        : { type: Boolean, required: true }, // if he would to check his websites
	receivingEmail: { type: Boolean, default:  true ,  required: true }, // if he would to send emails to him
	displayTheme  : { type: String,  default: "light", required: true  },  // display theme he prefer
	websitesCount : { type: Number,  required: true }, // How many websites put: increment whenever added a website, decrement when a website got deleted
	websites      : [       userWebsiteSchema       ], // user's websites
	// @TODO : add subscription model from push service
	pushRegisteration : {
		endpoint : { type: String || null, required:false, default: null },
		expirationTime : { type: String || Number || null, required:false, default: null },
		keys : {
			p256dh : { type:String || null, required:false, default: null },
			auth : { type: String || null, required:false, default: null }
		}
	}
});

const UserModel = model("users",UserSchema);

export default UserModel;
