import { Schema, model } from "mongoose";

const WebsiteLogSchema = new Schema({
	user_id     : { type: String, required: true },
	website_id  : { type: String, required: true },
	statusCode  : { type: Number, required: true },
	explanation : { type: String, required: true },
	whenitdown  : { type: String, required: true },
	log_id      : { type: String, required: true }
});

const WebsiteLogModel = model("websiteslog",  WebsiteLogSchema);

export default WebsiteLogModel;