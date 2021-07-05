"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_service_1 = __importDefault(require("./Authentication.service"));
const Check_service_1 = __importDefault(require("../Check/Check.service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = require("nodemailer");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const main_config_1 = __importDefault(require(".././main.config"));
const userService = new Authentication_service_1.default();
const websiteService = new Check_service_1.default();
class AuthenticationController {
    async getAuthenticatedUser(request, response) {
        const user = request.user;
        const gettingUser = await userService.findUser({ email: undefined, id: user.id });
        gettingUser.user.password = undefined;
        gettingUser.user.pushRegisteration = undefined;
        response.status(gettingUser.status).send({
            user: gettingUser.user, message: gettingUser.message
        });
    }
    async pushServiceRegisteration(request, response) {
        const body = request.body;
        const user = request.user;
        const attached = await userService.registerToPushService(user.id, body);
        response.status(attached.status).send({
            attached: attached.saved, message: attached.message
        });
    }
    async loginUser(request, response) {
        const body = request.body;
        const userEmail = await userService.findUser({ email: body.email, id: undefined });
        if (userEmail.found == true) {
            const matched = await bcrypt_1.compare(body.password, userEmail.user.password);
            if (matched != true) {
                response.status(404).send({ message: "credentials aren't correct!" });
            }
            else {
                const user_token = jsonwebtoken_1.sign({ id: userEmail.user._id, email: userEmail.user.email }, main_config_1.default.jwt_secret);
                response.status(userEmail.status).send({ loggedin: true, message: "Logged in!", user_token: user_token });
            }
        }
        else {
            response.status(userEmail.status).send({ loggedin: false, message: "Incorrect credentials!", });
        }
    }
    async registerUser(request, response) {
        const body = request.body;
        const emailExists = await userService.findUser({ email: body.email, id: undefined });
        if (emailExists.found == true) {
            response.status(404).send({ registered: false, message: 'email already exists' });
        }
        else {
            const salt = await bcrypt_1.genSalt(10);
            const hashed_password = await bcrypt_1.hash(body.password, salt);
            body.password = hashed_password;
            body.active = true;
            body.websitesCount = 1;
            const initialWebsite = body.websites[0];
            body.websites = [];
            const new_user = await userService.addUser(body);
            if (new_user.saved == true) {
                const addingWebsite = await websiteService.addWebsite(new_user.user._id, initialWebsite);
                const user_token = jsonwebtoken_1.sign({ id: new_user.user._id, email: new_user.user.email }, main_config_1.default.jwt_secret);
                response.status(new_user.status).send({ registered: true, message: "Registered successfully!", user_token: user_token });
            }
            else {
                response.status(new_user.status).send({
                    message: "Something went wrong!"
                });
            }
        }
    }
    async resetPassword(request, response) {
        const body = request.body;
        const user = await userService.findUser({ id: undefined, email: body.email });
        if (user.found == true) {
            const password = uuid_1.v4();
            const salt = await bcrypt_1.genSalt(10);
            const hashed_password = await bcrypt_1.hash(password, salt);
            const updatePassword = await userService.changePassword(user.user._id, hashed_password);
            var transporter = nodemailer_1.createTransport({
                service: 'gmail',
                auth: { user: main_config_1.default.email, pass: main_config_1.default.password }
            });
            let mailTemplate;
            transporter.sendMail({
                from: '"WebCheck Team" <mouadtaoussi0@gmail.com>',
                to: user.user.email,
                subject: 'Reset password request',
                text: "Hey there, it's your password: " + password,
                html: mailTemplate
            });
            response.status(updatePassword.status).send({
                sent: true,
                message: "email sent to your inbox!",
            });
        }
        else {
            response.status(404).send({
                message: "Make sure to put a correct email!",
                sent: false
            });
        }
    }
    async updateUser(request, response) {
        const user = request.user;
        const body = request.body;
        const userEmail = await userService.findUser({ email: body.email, id: undefined });
        if (userEmail.found == true) {
            if (user.email == body.email) {
                const updating = await userService.updateUser(user.id, body);
                response.status(updating.status).send({
                    updated: updating.updated,
                    message: updating.message
                });
            }
            else {
                if (body.email == undefined) {
                    const updating = await userService.updateUser(user.id, body);
                    response.status(updating.status).send({
                        updated: updating.updated,
                        message: updating.message
                    });
                }
                else {
                    response.status(404).send({
                        updated: false,
                        message: "Email alreay provided!"
                    });
                }
            }
        }
        else {
            const updating = await userService.updateUser(user.id, body);
            response.status(updating.status).send({
                updated: updating.updated,
                message: updating.message
            });
        }
    }
    async deleteUser(request, response) {
        const password = request.query.password;
        console.log(request.query);
        if (!password) {
            response.status(400).send({ message: "no password prvided!" });
            response.end();
        }
        ;
        const user = await userService.findUser({ email: undefined, id: request.user.id });
        if (user.found == true) {
            const matched = await bcrypt_1.compare(password, user.user.password);
            if (matched) {
                const user = await userService.deleteUser(request.user.id);
                response.status(user.status).send({
                    deleted: user.deleted, message: user.message
                });
            }
            else {
                response.status(401).send({ message: 'Not authorized' });
            }
        }
        else {
            response.status(401).send({ message: 'Not authorized' });
        }
    }
    async Authenticated(request, response, next) {
        const token = request.query.token;
        if (!token) {
            response.status(401).send({ message: "Not authenticated" });
        }
        else {
            const user = await jsonwebtoken_1.verify(token, main_config_1.default.jwt_secret);
            if (!user) {
                response.status(401).send({ message: 'token not valid', });
            }
            ;
            request.user = user;
            next();
        }
    }
}
exports.default = AuthenticationController;
