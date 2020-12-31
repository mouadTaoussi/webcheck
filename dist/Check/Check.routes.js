"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Check_controller_1 = __importDefault(require("./Check.controller"));
const Authentication_controller_1 = __importDefault(require(".././Authentication/Authentication.controller"));
const website_logs_router = express_1.default();
const check_website_controller = new Check_controller_1.default();
const AuthController = new Authentication_controller_1.default();
website_logs_router.delete('/deleteWebsite', AuthController.Authenticated, check_website_controller.deleteWebsite);
website_logs_router.post('/add', AuthController.Authenticated, check_website_controller.addWebsite);
website_logs_router.get('/logs', AuthController.Authenticated, check_website_controller.websiteLogs);
website_logs_router.delete('/clearLogs', AuthController.Authenticated, check_website_controller.deleteWebsiteLogs);
exports.default = website_logs_router;
