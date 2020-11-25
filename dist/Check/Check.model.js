"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var WebsiteLogSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    website_id: { type: String, required: true },
    status_code: { type: Number, required: true },
    explanation: { type: String, required: true },
    whenitdown: { type: String, required: true },
    log_id: { type: String, required: true }
});
var WebsiteLogModel = mongoose_1.model("websiteslog", WebsiteLogSchema);
exports.default = WebsiteLogModel;
