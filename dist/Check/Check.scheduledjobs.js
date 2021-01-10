"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Check_controller_1 = __importDefault(require("./Check.controller"));
const node_schedule_1 = require("node-schedule");
const checkWebsitesJob = new Check_controller_1.default().checkEveryWebsiteExists;
const calculteAverageResponseOfWebsite = new Check_controller_1.default().calculateAverageResponseOfWebsite;
setInterval(checkWebsitesJob, 2000);
node_schedule_1.scheduleJob({ hour: 14, minute: 30, dayOfWeek: 0 }, calculteAverageResponseOfWebsite);
setInterval(calculteAverageResponseOfWebsite, 60000);
