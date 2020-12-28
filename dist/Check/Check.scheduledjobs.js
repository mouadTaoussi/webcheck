"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Check_controller_1 = __importDefault(require("./Check.controller"));
var node_schedule_1 = require("node-schedule");
var checkWebsitesJob = new Check_controller_1.default().checkEveryWebsiteExists;
var calculteAverageResponseOfWebsite = new Check_controller_1.default().calculateAverageResponseOfWebsite;
setInterval(checkWebsitesJob, 90000);
node_schedule_1.scheduleJob({ hour: 14, minute: 30, dayOfWeek: 0 }, calculteAverageResponseOfWebsite);
