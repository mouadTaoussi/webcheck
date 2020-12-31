"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_model_1 = __importDefault(require("./Authentication.model"));
const Check_model_1 = require(".././Check/Check.model");
class AuthenticationService {
    async registerToPushService(user_id, object) {
        try {
            const user = await Authentication_model_1.default.findByIdAndUpdate(user_id, { pushRegisteration: object });
            return {
                status: 200, saved: true, message: null,
            };
        }
        catch (error) {
            return {
                status: 500, saved: false, message: 'something went wrong! Try again.'
            };
        }
    }
    async addUser(body) {
        try {
            const init_new_user = new Authentication_model_1.default(body);
            const new_user = await init_new_user.save();
            return {
                status: 200, saved: true, message: null, user: new_user
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500, saved: false, message: 'something went wrong! Try again.', user: null
            };
        }
    }
    async findUser(options) {
        try {
            if (options.id == undefined && options.email != undefined) {
                const user = await Authentication_model_1.default.findOne({ email: options.email });
                if (user == null)
                    return {
                        status: 404, found: false, message: "user doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: user
                };
            }
            else if (options.id != undefined && options.email == undefined) {
                const user = await Authentication_model_1.default.findById(options.id);
                if (user == null)
                    return {
                        status: 404, found: false, message: "user doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: user
                };
            }
            else if (options.id == undefined && options.email == undefined) {
                const users = await Authentication_model_1.default.find();
                if (users == null)
                    return {
                        status: 404, found: false, message: "users doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: users
                };
            }
            else {
                return {
                    status: 404, found: false, message: 'something went wrong! Try again.', user: null
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 500, found: false,
                message: 'something went wrong! Try again.', user: null
            };
        }
    }
    async updateUser(user_id, body) {
        try {
            const user = await Authentication_model_1.default.findByIdAndUpdate(user_id, body);
            return { status: 200, updated: true, message: 'user updated successfully!' };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500, updated: false, message: 'something went wrong! Try again.'
            };
        }
    }
    async changePassword(id, password) {
        try {
            const user = await Authentication_model_1.default.findByIdAndUpdate(id, { password: password });
            return {
                status: 200, changed: true, message: 'password changed successfully!'
            };
        }
        catch (error) {
            console.log(error);
            return { status: 500, changed: false, message: 'something went wrong! Try again.' };
        }
    }
    async deleteUser(user_id) {
        try {
            const user = await Authentication_model_1.default.findById(user_id).remove();
            const logs = await Check_model_1.WebsiteLogModel.find({ user_id: user_id });
            for (var i = 0; logs.length > i; i++) {
                await logs[i].remove();
            }
            return { status: 200, deleted: true, message: 'user deleted successfully' };
        }
        catch (error) {
            console.log(error);
            return { status: 500, deleted: false, message: 'something went wrong! Try again.' };
        }
    }
}
exports.default = AuthenticationService;
