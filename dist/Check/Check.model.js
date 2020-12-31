"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteAverageTimeInDayModel = exports.websitesResponsesTimeInDayModel = exports.WebsiteLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const WebsiteLogSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    website_id: { type: String, required: true },
    status_code: { type: Number, required: true },
    explanation: { type: String, required: true },
    whenitdown: { type: String, required: true },
    log_id: { type: String, required: true }
});
const websitesResponsesTimeInDaySchema = new mongoose_1.Schema({
    website_id: { type: String, required: true },
    user_id: { type: String, required: true },
    response_times_melliseconds: [mongoose_1.default.Schema.Types.Mixed]
});
const websiteAverageTimeInDaySchema = new mongoose_1.Schema({
    website_id: { type: String, required: true },
    website_name: { type: String, required: true },
    user_id: { type: String, required: true },
    website_speed_last_ten_days: [{ date: String, average_melliseconds: Number }]
});
const WebsiteLogModel = mongoose_1.model("websiteslog", WebsiteLogSchema);
exports.WebsiteLogModel = WebsiteLogModel;
const websitesResponsesTimeInDayModel = mongoose_1.model("websitesResponsesTimeInDay", websitesResponsesTimeInDaySchema);
exports.websitesResponsesTimeInDayModel = websitesResponsesTimeInDayModel;
const websiteAverageTimeInDayModel = mongoose_1.model("websiteAverageTimeInDay", websiteAverageTimeInDaySchema);
exports.websiteAverageTimeInDayModel = websiteAverageTimeInDayModel;
