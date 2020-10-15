import { Schema, model } from "mongoose";

const WebsiteLogSchema = new Schema({
	user_id     : { type: String, required: true }, // a reference to the user
	website_id  : { type: String, required: true }, // a reference to the website
	statusCode  : { type: Number, required: true }, // Status code where the website got down
	explanation : { type: String, required: true }, // Status code description
	whenitdown  : { type: String, required: true }, // when it occurs?
	log_id      : { type: String, required: true }  // a given id to fetch a specific log
});

const WebsiteLogModel = model("websiteslog",  WebsiteLogSchema);

export default WebsiteLogModel;