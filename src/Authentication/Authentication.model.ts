import { Schema, model } from "mongoose";

const userWebsiteSchema = new Schema({
	name          : { type : String }, // a name given for the website
	description   : { type : String }, // a description of that website
	active        : { type : String }, // if the website is working then <true>, if down then <false>
	website       : { type : String }  // Website Url
})

const UserSchema = new Schema({
	name          : { type: String,  required: true },
	email         : { type: String,  required: true },
	password      : { type: String,  required: true },
	active        : { type: Boolean, required: true }, // if he would to check his websites
	receivingEmail: { type: Boolean, default:  true ,  required: true }, // if he would to send emails to him
	displayTheme  : { type: String,  default: "light", required: true  },  // display theme he prefer
	websitesCount : { type: Number,  required: true }, // How many websites put: increment whenever added a website, decrement when a website got deleted
	websites      : [       userWebsiteSchema       ]  // user's websites
});

const UserModel = model("users",UserSchema);

export default UserModel;
