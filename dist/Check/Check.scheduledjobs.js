"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Check_controller_1 = __importDefault(require("./Check.controller"));
const node_cron_1 = require("node-cron");
const checkWebsitesJob = new Check_controller_1.default().checkEveryWebsiteExists;
const calculteAverageResponseOfWebsite = new Check_controller_1.default().calculateAverageResponseOfWebsite;
setInterval(checkWebsitesJob, 90000);
node_cron_1.schedule('05 00 * * *', calculteAverageResponseOfWebsite);
