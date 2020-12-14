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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Check_service_1 = __importDefault(require("./Check.service"));
var axios_1 = __importDefault(require("axios"));
var web_push_1 = __importStar(require("web-push"));
var nodemailer_1 = require("nodemailer");
var Authentication_service_1 = __importDefault(require(".././Authentication/Authentication.service"));
var main_config_1 = __importDefault(require(".././main.config"));
var websiteService = new Check_service_1.default();
var userService = new Authentication_service_1.default();
var CheckWebsiteController = (function () {
    function CheckWebsiteController() {
        this.vapidPublicKey = main_config_1.default.vapid_public_key;
        this.vapidPrivateKey = main_config_1.default.vapid_private_key;
        web_push_1.default.setGCMAPIKey('<Your GCM API Key Here>');
        web_push_1.default.setVapidDetails('mailto:example@yourdomain.org', this.vapidPublicKey, this.vapidPrivateKey);
    }
    CheckWebsiteController.prototype.addWebsite = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var website, user, saving;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        website = request.body;
                        user = request.user;
                        return [4, websiteService.addWebsite(user.id, website)];
                    case 1:
                        saving = _a.sent();
                        response.status(saving.status).send({
                            message: saving.message,
                            website: saving.data
                        });
                        return [2];
                }
            });
        });
    };
    CheckWebsiteController.prototype.deleteWebsite = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, website_id, deleting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = request.user;
                        website_id = request.query.website_id;
                        return [4, websiteService.deleteWebsite(user.id, website_id)];
                    case 1:
                        deleting = _a.sent();
                        response.status(deleting.status).send({
                            message: deleting.message,
                        });
                        return [2];
                }
            });
        });
    };
    CheckWebsiteController.prototype.websiteLogs = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = request.user;
                        return [4, websiteService.getLogs(user.id)];
                    case 1:
                        logs = _a.sent();
                        response.status(logs.status).send({
                            logs: logs.data,
                        });
                        return [2];
                }
            });
        });
    };
    CheckWebsiteController.prototype.deleteWebsiteLogs = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, deleting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = request.user;
                        return [4, websiteService.deleteLogs(user.id, undefined)];
                    case 1:
                        deleting = _a.sent();
                        response.status(deleting.status).send({
                            message: deleting.message
                        });
                        return [2];
                }
            });
        });
    };
    CheckWebsiteController.prototype.handlePushAndEmail = function (registeration, options) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, transporter, mailTemplate, push;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            title: options.message,
                            url: options.url
                        };
                        web_push_1.sendNotification(registeration, JSON.stringify(payload));
                        if (!options.receiving_email)
                            return [2];
                        transporter = nodemailer_1.createTransport({
                            service: 'gmail',
                            auth: { user: main_config_1.default.email, pass: main_config_1.default.password }
                        });
                        mailTemplate = "\n\t\t<!DOCTYPE html><!-- English template -->\n\t\t<html>\n\t\t<head>\n\t\t\t<title>Email template</title>\n\t\t</head>\n\t\t<body style='background-color: rgba(0,0,0,.1);padding:20px;' >\n\t\t<center></center>\n\t\t<div style=\"width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;\">\n\t\t<h1>Hello! " + options.user_email + "</h1>\n\t\t<h5>" + options.message + "</h5>\n\t\t<h2>Website: " + options.website_name + "</h2>\n\t\t<p><strong>Thank you!</strong></p>\n\t\t<p>WebCheck Team.</p>\n\t\t</div>\n\t\t<center>\n\t\t<ul style=\"list-style: none;margin: 10px 10px 10px 10px;\" class=\"footer-list local-mt-4\">\n\t\t\t<li style='display: inline;padding:8px;' class='footer-list-item'>Terms of service</li>\n\t\t\t<li style='display: inline;padding:8px;' class='footer-list-item'>Privacy & policy</li>\n\t\t\t<li style='display: inline;padding:8px;' class='footer-list-item'>How it works?</li>\n\t\t</ul>\n\t\t</center>\n\t\t</body>\n\t\t</html>\n\t\t";
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
                        return [4, websiteService.pushLog(options.status_code, options.user_id, options.website_id)];
                    case 1:
                        push = _a.sent();
                        return [2];
                }
            });
        });
    };
    CheckWebsiteController.prototype.checkEveryWebsiteExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, i, o, checking, error_1, checking, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userService.findUser({ id: undefined, email: undefined })];
                    case 1:
                        users = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < users.user.length)) return [3, 21];
                        if (!!users.user[i].active) return [3, 3];
                        return [3, 20];
                    case 3:
                        o = 0;
                        _a.label = 4;
                    case 4:
                        if (!(o < users.user[i].websites.length)) return [3, 20];
                        if (!users.user[i].websites[o].active) return [3, 15];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 14]);
                        return [4, axios_1.default({
                                method: 'GET',
                                url: users.user[i].websites[o].website,
                                headers: {
                                    "access-control-allow-origin": "*",
                                }
                            })];
                    case 6:
                        checking = _a.sent();
                        return [3, 14];
                    case 7:
                        error_1 = _a.sent();
                        if (!error_1.response) return [3, 9];
                        users.user[i].websites[o].active = false;
                        return [4, users.user[i].save()];
                    case 8:
                        _a.sent();
                        new CheckWebsiteController().handlePushAndEmail(users.user[i].pushRegisteration, {
                            message: "Your website is currently down!",
                            url: users.user[i].websites[o].website,
                            website_name: users.user[i].websites[o].name,
                            status_code: error_1.response.status,
                            user_id: users.user[i]._id,
                            user_email: users.user[i].email,
                            receiving_email: users.user[i].receivingEmail,
                            website_id: users.user[i].websites[o]._id
                        });
                        return [3, 13];
                    case 9:
                        if (!error_1.message.includes('ENOTFOUND')) return [3, 11];
                        users.user[i].websites[o].active = false;
                        return [4, users.user[i].save()];
                    case 10:
                        _a.sent();
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
                        return [3, 13];
                    case 11:
                        if (!error_1.message.includes('ECONNREFUSED')) return [3, 13];
                        users.user[i].websites[o].active = false;
                        return [4, users.user[i].save()];
                    case 12:
                        _a.sent();
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
                        _a.label = 13;
                    case 13: return [3, 14];
                    case 14: return [3, 19];
                    case 15:
                        _a.trys.push([15, 18, , 19]);
                        return [4, axios_1.default({
                                method: 'GET',
                                url: users.user[i].websites[o].website,
                                headers: {
                                    "access-control-allow-origin": "*",
                                }
                            })];
                    case 16:
                        checking = _a.sent();
                        users.user[i].websites[o].active = true;
                        return [4, users.user[i].save()];
                    case 17:
                        _a.sent();
                        return [3, 19];
                    case 18:
                        error_2 = _a.sent();
                        return [3, 19];
                    case 19:
                        o++;
                        return [3, 4];
                    case 20:
                        i++;
                        return [3, 2];
                    case 21: return [2];
                }
            });
        });
    };
    return CheckWebsiteController;
}());
var checkWebsitesJob = new CheckWebsiteController().checkEveryWebsiteExists;
setInterval(checkWebsitesJob, 60000);
exports.default = CheckWebsiteController;
