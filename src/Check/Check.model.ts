import { Schema, model } from "mongoose";


const WebsiteLogSchema = new Schema({

});

const WebsiteLogModel = model("websiteslog",WebsiteLogSchema);
 
export default WebsiteLogModel;