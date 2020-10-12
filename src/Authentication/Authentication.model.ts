import { Schema, model } from "mongoose";


const UserSchema = new Schema({

});

const UserModel = model("users",UserSchema);

export default UserModel;