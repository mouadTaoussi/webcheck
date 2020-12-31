"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_model_1 = __importDefault(require(".././Authentication/Authentication.model"));
const mongoose_1 = require("mongoose");
const main_config_1 = __importDefault(require(".././main.config"));
const nodemailer_1 = require("nodemailer");
mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
class EmailService {
    async sendEmails() {
        const users = await Authentication_model_1.default.find({});
        for (var i = 0; i < users.length; i++) {
            const userEmail = users[i].email;
            var transporter = nodemailer_1.createTransport({
                service: 'gmail',
                auth: { user: main_config_1.default.email, pass: main_config_1.default.password }
            });
            let mailTemplate;
            transporter.sendMail({
                from: '"WebCheck Team" <mouadtaoussi0@gmail.com>',
                to: userEmail,
                subject: 'Now you can see your website speed!',
                text: 'Hey there, it’s your link to change your password below ;) ',
                html: mailTemplate
            });
        }
    }
}
new EmailService().sendEmails();
setTimeout(() => {
    process.exit(0);
}, 60000);
