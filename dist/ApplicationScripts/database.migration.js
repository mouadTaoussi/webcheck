"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Check_model_1 = require(".././Check/Check.model");
const Authentication_model_1 = __importDefault(require(".././Authentication/Authentication.model"));
const mongoose_1 = require("mongoose");
const main_config_1 = __importDefault(require(".././main.config"));
mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
class Migration {
    async up() {
        const users = await Authentication_model_1.default.find({});
        for (var i = 0; i < users.length; i++) {
            for (var io = 0; io < users[i].websites.length; io++) {
                const WRTID = await Check_model_1.websitesResponsesTimeInDayModel.findOne({ user_id: users[i]._id, website_id: users[i].websites[io]._id });
                const WATID = await Check_model_1.websiteAverageTimeInDayModel.findOne({ user_id: users[i]._id, website_id: users[i].websites[io]._id });
                if (WRTID == null) {
                    const newInstance = new Check_model_1.websitesResponsesTimeInDayModel({
                        user_id: users[i]._id,
                        website_id: users[i].websites[io]._id,
                        response_times_melliseconds: []
                    });
                    await newInstance.save();
                }
                else {
                }
                if (WATID == null) {
                    const newInstance = new Check_model_1.websiteAverageTimeInDayModel({
                        user_id: users[i]._id,
                        website_id: users[i].websites[io]._id,
                        website_name: users[i].websites[io].name,
                        website_speed_last_ten_days: []
                    });
                    await newInstance.save();
                }
                else {
                }
            }
        }
    }
    async down() {
    }
}
new Migration().up();
setTimeout(() => {
    process.exit(0);
}, 60000);
