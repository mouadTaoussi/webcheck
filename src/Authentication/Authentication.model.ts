import { Schema, model } from "mongoose";

const userWebsiteSchema = new Schema({
	website : { type : String }
})

const UserSchema = new Schema({
	name     : { type: String, required: true },
	email    : { type: String, required: true },
	password : { type: String, required: true },
	websites : [       userWebsiteSchema       ]
});

const UserModel = model("users",UserSchema);

export default UserModel;