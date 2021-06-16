"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Check_model_1 = require("./Check.model");
const Authentication_model_1 = __importDefault(require(".././Authentication/Authentication.model"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const main_config_1 = __importDefault(require(".././main.config"));
class CheckWebsitesService {
    constructor() {
        this.statusCodes = [
            {
                code: 404,
                description: "Might be you entered a wrong website Url"
            },
            {
                code: 500,
                description: "Internal Server Error"
            },
            {
                code: 501,
                description: "Not Implemented: The server either does not recognize the request method,or it lacks the ability to fulfil the request."
            },
            {
                code: 502,
                description: "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream."
            },
            {
                code: 503,
                description: "Service Unavailable: The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state."
            },
            {
                code: 504,
                description: "Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server."
            },
            {
                code: 505,
                description: "HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request."
            },
            {
                code: 506,
                description: "Variant Also Negotiates (RFC 2295): Transparent content negotiation for the request results in a circular reference."
            },
            {
                code: 507,
                description: "Insufficient Storage (WebDAV; RFC 4918): The server is unable to store the representation needed to complete the request."
            },
            {
                code: 509,
                description: "Loop Detected (WebDAV; RFC 5842): The server detected an infinite loop while processing the request (sent instead of 208 Already Reported)."
            },
            {
                code: 510,
                description: "Not Extended (RFC 2774): Further extensions to the request are required for the server to fulfil it."
            },
            {
                code: 511,
                description: "Network Authentication Required (RFC 6585)."
            }
        ];
    }
    async addWebsite(user_id, website) {
        try {
            const user = await Authentication_model_1.default.findOne({ _id: user_id });
            if (user.websitesCount < main_config_1.default.websites_limit) {
                const isExists = await Authentication_model_1.default.findOne({ "websites.website": website.website });
                if (isExists !== null) {
                    return {
                        status: 200, message: 'You cannot add an existing website!',
                        data: null
                    };
                }
                const userWebsites = user.websites;
                const plusOne = user.websitesCount + 1;
                website.active = true;
                userWebsites.push(website);
                const update = await Authentication_model_1.default.findByIdAndUpdate(user_id, {
                    websitesCount: plusOne,
                    websites: userWebsites
                }, { new: true });
                const website_id = update.websites[update.websites.length - 1]._id;
                const addResponseTimesDocument = new Check_model_1.websitesResponsesTimeInDayModel({
                    website_id: website_id,
                    user_id: user_id,
                    response_times_melliseconds: []
                });
                await addResponseTimesDocument.save();
                const addAverageResponseTimeDocument = new Check_model_1.websiteAverageTimeInDayModel({
                    website_id: website_id,
                    user_id: user_id,
                    website_name: website.name,
                    website_speed_last_ten_days: []
                });
                await addAverageResponseTimeDocument.save();
                return {
                    status: 200, message: 'A new website added!!', data: website
                };
            }
            else {
                return {
                    status: 200, message: 'You cannot add more than ' + main_config_1.default.websites_limit + ' websites!!',
                    data: null
                };
            }
        }
        catch (error) {
            return {
                status: 500, message: "Something went wrong!", data: null
            };
        }
    }
    async deleteWebsite(user_id, website_id) {
        try {
            const user = await Authentication_model_1.default.findOne({ _id: user_id });
            const websites = user.websites;
            let websitesNotDeleted = [];
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id.toString() == website_id.toString()) {
                    continue;
                }
                else {
                    websitesNotDeleted.push(websites[i]);
                }
            }
            await Check_model_1.websitesResponsesTimeInDayModel.findOne({ website_id: website_id }).remove();
            await Check_model_1.websiteAverageTimeInDayModel.findOne({ website_id: website_id }).remove();
            const decreaseOne = user.websitesCount - 1;
            const update = await Authentication_model_1.default.findByIdAndUpdate(user_id, {
                websitesCount: decreaseOne,
                websites: websitesNotDeleted
            });
            return { status: 200, message: "Website deleted successfully", };
        }
        catch (error) {
            return { status: 500, message: "Something went wrong!", };
        }
    }
    async pushLog(status_code, user_id, website_id) {
        const explanation = this.statusCodes.filter((statuscode) => {
            return statuscode.code == status_code;
        })[0];
        const saving = new Check_model_1.WebsiteLogModel({
            user_id: user_id,
            website_id: website_id,
            status_code: status_code,
            explanation: explanation.description,
            whenitdown: moment_1.default().format('MMMM Do YYYY, h:mm:ss a'),
            log_id: uuid_1.v4()
        });
        try {
            await saving.save();
            return {
                status: 200, message: null, data: null
            };
        }
        catch (error) {
            return {
                status: 500, message: "Something went wrong!", data: null
            };
        }
    }
    async getLogs(user_id) {
        try {
            const user = await Authentication_model_1.default.findOne({ _id: user_id });
            let logs = await Check_model_1.WebsiteLogModel.find({
                user_id: user._id
            });
            return { status: 200, message: null, data: logs };
        }
        catch (error) {
            return {
                status: 500, message: "Something went wrong!", data: null
            };
        }
    }
    async deleteLogs(user_id, website_id) {
        try {
            const logs = await Check_model_1.WebsiteLogModel.find({ user_id: user_id });
            for (var i = 0; logs.length > i; i++) {
                await logs[i].remove();
            }
            return { status: 200, message: "Logs has been deleted successfully", data: null };
        }
        catch (error) {
            return {
                status: 500, message: "Something went wrong!", data: null
            };
        }
    }
    async getResponsesTimesForWebsites() {
        try {
            const websites_response_times = await Check_model_1.websitesResponsesTimeInDayModel.find({});
            return {
                status: 200, data: websites_response_times
            };
        }
        catch (err) {
            return {
                status: 500, data: null
            };
        }
    }
    async getAverageTimeForWebsite(website_id, user_id) {
        try {
            let websiteAverageTimeInDay;
            if (website_id != undefined && user_id == undefined) {
                websiteAverageTimeInDay = await Check_model_1.websiteAverageTimeInDayModel.findOne({ website_id: website_id });
            }
            else if (website_id == undefined && user_id != undefined) {
                websiteAverageTimeInDay = await Check_model_1.websiteAverageTimeInDayModel.find({ user_id: user_id });
            }
            return {
                status: 200, data: websiteAverageTimeInDay
            };
        }
        catch (err) {
            return {
                status: 500, data: null
            };
        }
    }
    async pushResponseTimeForWebsite(website_id, responseTime) {
        try {
            let websitesResponsesTimeInDay = await Check_model_1.websitesResponsesTimeInDayModel.findOne({ website_id: website_id });
            websitesResponsesTimeInDay.response_times_melliseconds.push(responseTime);
            await websitesResponsesTimeInDay.save();
            return {
                status: 200, message: "Saved!"
            };
        }
        catch (err) {
            console.log("error");
            return {
                status: 500, message: "Something went wrong!"
            };
        }
    }
    async pushAverageResponseForToday(website_id, entitiy) {
        try {
            if (isNaN(entitiy.average_melliseconds)) {
                entitiy.average_melliseconds = 0;
            }
            let websiteAverageTimeInDay = await Check_model_1.websiteAverageTimeInDayModel.findOne({ website_id: website_id });
            websiteAverageTimeInDay.website_speed_last_ten_days.push(entitiy);
            await websiteAverageTimeInDay.save();
            return {
                status: 200, message: "Saved!"
            };
        }
        catch (err) {
            return {
                status: 500, message: "Something went wrong!"
            };
        }
    }
    async popOlderEntity(website_id) {
        try {
            let websiteAverageTimeInDay = await Check_model_1.websiteAverageTimeInDayModel.findOne({ website_id: website_id });
            const entities = websiteAverageTimeInDay.website_speed_last_ten_days;
            let entitiesOutput = [];
            for (var i = 0; entities.length > i; i++) {
                if (i == 0) {
                    continue;
                }
                else {
                    entitiesOutput.push(entities[i]);
                }
            }
            websiteAverageTimeInDay.website_speed_last_ten_days = entitiesOutput;
            await websiteAverageTimeInDay.save();
            return {
                status: 200, message: "Deleted!"
            };
        }
        catch (err) {
            return {
                status: 200, message: "Deleted!"
            };
        }
    }
    async clearResponseTimesForWebsite(website_id) {
        try {
            let websitesResponsesTimeInDay = await Check_model_1.websitesResponsesTimeInDayModel.findOne({ website_id: website_id });
            websitesResponsesTimeInDay.response_times_melliseconds = [];
            await websitesResponsesTimeInDay.save();
            return {
                status: 200, message: "Deleted!"
            };
        }
        catch (err) {
            return {
                status: 200, message: "Deleted!"
            };
        }
    }
}
exports.default = CheckWebsitesService;
