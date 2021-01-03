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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Check_service_1 = __importDefault(require("./Check.service"));
const axios_1 = __importDefault(require("axios"));
const web_push_1 = __importStar(require("web-push"));
const nodemailer_1 = require("nodemailer");
const moment_1 = __importDefault(require("moment"));
const Authentication_service_1 = __importDefault(require(".././Authentication/Authentication.service"));
const main_config_1 = __importDefault(require(".././main.config"));
const websiteService = new Check_service_1.default();
const userService = new Authentication_service_1.default();
class CheckWebsiteController {
    constructor() {
        this.vapidPublicKey = main_config_1.default.vapid_public_key;
        this.vapidPrivateKey = main_config_1.default.vapid_private_key;
        web_push_1.default.setGCMAPIKey('<Your GCM API Key Here>');
        web_push_1.default.setVapidDetails('mailto:example@yourdomain.org', this.vapidPublicKey, this.vapidPrivateKey);
        axios_1.default.interceptors.request.use((config) => {
            config.metadata = { startTime: new Date() };
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        axios_1.default.interceptors.response.use((response) => {
            response.config.metadata.endTime = new Date();
            response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
            return response;
        }, (error) => {
            error.config.metadata.endTime = new Date();
            error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
            return Promise.reject(error);
        });
    }
    async addWebsite(request, response) {
        const website = request.body;
        const user = request.user;
        const saving = await websiteService.addWebsite(user.id, website);
        response.status(saving.status).send({
            message: saving.message,
            website: saving.data
        });
    }
    async deleteWebsite(request, response) {
        const user = request.user;
        const { website_id } = request.query;
        const deleting = await websiteService.deleteWebsite(user.id, website_id);
        response.status(deleting.status).send({
            message: deleting.message,
        });
    }
    async websiteLogs(request, response) {
        const user = request.user;
        const logs = await websiteService.getLogs(user.id);
        response.status(logs.status).send({
            logs: logs.data,
        });
    }
    async deleteWebsiteLogs(request, response) {
        const user = request.user;
        const deleting = await websiteService.deleteLogs(user.id, undefined);
        response.status(deleting.status).send({
            message: deleting.message
        });
    }
    async handlePushAndEmail(registeration, options) {
        const payload = {
            title: options.message,
            url: options.url
        };
        web_push_1.sendNotification(registeration, JSON.stringify(payload));
        if (!options.receiving_email)
            return;
        var transporter = nodemailer_1.createTransport({
            service: 'gmail',
            auth: { user: main_config_1.default.email, pass: main_config_1.default.password }
        });
        let mailTemplate = `
		<!DOCTYPE html><!-- English template -->
		<html>
		<head>
			<title>Email template</title>
		</head>
		<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
		<center></center>
		<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">
		<h1>Hello! ${options.user_email}</h1>
		<h5>${options.message}</h5>
		<h2>Website: ${options.website_name}</h2>
		<p><strong>Thank you!</strong></p>
		<p>WebCheck Team.</p>
		</div>
		<center>
		<ul style="list-style: none;margin: 10px 10px 10px 10px;" class="footer-list local-mt-4">
			<li style='display: inline;padding:8px;' class='footer-list-item'>Terms of service</li>
			<li style='display: inline;padding:8px;' class='footer-list-item'>Privacy & policy</li>
			<li style='display: inline;padding:8px;' class='footer-list-item'>How it works?</li>
		</ul>
		</center>
		</body>
		</html>
		`;
        try {
            transporter.sendMail({
                from: '"WebCheck Team" <mouadtaoussi0@gmail.com>',
                to: options.user_email,
                subject: 'Something went wrong!',
                text: options.message,
                html: mailTemplate
            });
        }
        catch (err) {
            console.log('Something went wrong with nodemailer');
            console.log(err.message);
        }
        const push = await websiteService.pushLog(options.status_code, options.user_id, options.website_id);
    }
    async checkEveryWebsiteExists() {
        const users = await userService.findUser({ id: undefined, email: undefined });
        for (let i = 0; i < users.user.length; i++) {
            if (!users.user[i].active) {
                continue;
            }
            else {
                for (let o = 0; o < users.user[i].websites.length; o++) {
                    if (users.user[i].websites[o].active) {
                        try {
                            const checking = await axios_1.default({
                                method: 'GET',
                                url: users.user[i].websites[o].website,
                                headers: {
                                    "access-control-allow-origin": "*",
                                }
                            });
                            const responseTime = checking.duration;
                            const pushing = await websiteService.pushResponseTimeForWebsite(users.user[i].websites[o]._id, responseTime);
                        }
                        catch (error) {
                            if (error.response) {
                                users.user[i].websites[o].active = false;
                                await users.user[i].save();
                                new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration, {
                                    message: "Your website is currently down!",
                                    url: users.user[i].websites[o].website,
                                    website_name: users.user[i].websites[o].name,
                                    status_code: error.response.status,
                                    user_id: users.user[i]._id,
                                    user_email: users.user[i].email,
                                    receiving_email: users.user[i].receivingEmail,
                                    website_id: users.user[i].websites[o]._id
                                });
                            }
                            else {
                                if (error.message.includes('ENOTFOUND')) {
                                    users.user[i].websites[o].active = false;
                                    await users.user[i].save();
                                    new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration, {
                                        message: "Might be you entered a wrong website url!",
                                        url: users.user[i].websites[o].website,
                                        website_name: users.user[i].websites[o].name,
                                        status_code: 404,
                                        user_id: users.user[i]._id,
                                        user_email: users.user[i].email,
                                        receiving_email: users.user[i].receivingEmail,
                                        website_id: users.user[i].websites[o]._id
                                    });
                                }
                                else if (error.message.includes('ECONNREFUSED')) {
                                    users.user[i].websites[o].active = false;
                                    await users.user[i].save();
                                    new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration, {
                                        message: "Your website is currently down!",
                                        url: users.user[i].websites[o].website,
                                        website_name: users.user[i].websites[o].name,
                                        status_code: 500,
                                        user_id: users.user[i]._id,
                                        user_email: users.user[i].email,
                                        receiving_email: users.user[i].receivingEmail,
                                        website_id: users.user[i].websites[o]._id
                                    });
                                }
                            }
                        }
                    }
                    else {
                        try {
                            const checking = await axios_1.default({
                                method: 'GET',
                                url: users.user[i].websites[o].website,
                                headers: {
                                    "access-control-allow-origin": "*",
                                }
                            });
                            const responseTime = checking.duration;
                            const pushing = await websiteService.pushResponseTimeForWebsite(users.user[i].websites[o]._id, responseTime);
                            users.user[i].websites[o].active = true;
                            await users.user[i].save();
                        }
                        catch (error) {
                            continue;
                        }
                    }
                }
            }
        }
    }
    async calculateAverageResponseOfWebsite() {
        const responsesTime = await websiteService.getResponsesTimesForWebsites();
        for (var i = 0; i < responsesTime.data.length; i++) {
            var sum = 0;
            var average = 0;
            const user_id = responsesTime.data[i].user_id;
            const website_id = responsesTime.data[i].website_id;
            for (var io = 0; io < responsesTime.data[i].response_times_melliseconds.length; ++io) {
                sum += responsesTime.data[i].response_times_melliseconds[io];
            }
            average = sum / responsesTime.data[i].response_times_melliseconds.length;
            const entity = { date: moment_1.default().format('L'), average_melliseconds: average };
            const addIt = await websiteService.pushAverageResponseForToday(website_id, entity);
            const deleteResponsesTime = await websiteService.clearResponseTimesForWebsite(website_id);
            const averageEntities = await websiteService.getAverageTimeForWebsite(website_id, undefined);
            if (averageEntities.data.website_speed_last_ten_days.length > 11) {
                console.log('reached');
                const popOlderEntity = await websiteService.popOlderEntity(website_id);
            }
            else {
                continue;
            }
        }
    }
}
exports.default = CheckWebsiteController;
