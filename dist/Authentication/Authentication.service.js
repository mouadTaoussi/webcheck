"use strict";
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
var Authentication_model_1 = __importDefault(require("./Authentication.model"));
var Check_model_1 = require(".././Check/Check.model");
var AuthenticationService = (function () {
    function AuthenticationService() {
    }
    AuthenticationService.prototype.registerToPushService = function (user_id, object) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, Authentication_model_1.default.findByIdAndUpdate(user_id, { pushRegisteration: object })];
                    case 1:
                        user = _a.sent();
                        return [2, {
                                status: 200, saved: true, message: null,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2, {
                                status: 500, saved: false, message: 'something went wrong! Try again.'
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationService.prototype.addUser = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var init_new_user, new_user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        init_new_user = new Authentication_model_1.default(body);
                        return [4, init_new_user.save()];
                    case 1:
                        new_user = _a.sent();
                        return [2, {
                                status: 200, saved: true, message: null, user: new_user
                            }];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, {
                                status: 500, saved: false, message: 'something went wrong! Try again.', user: null
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationService.prototype.findUser = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var user, user, users, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        if (!(options.id == undefined && options.email != undefined)) return [3, 2];
                        return [4, Authentication_model_1.default.findOne({ email: options.email })];
                    case 1:
                        user = _a.sent();
                        if (user == null)
                            return [2, {
                                    status: 404, found: false, message: "user doesn't exists!", user: null
                                }];
                        return [2, {
                                status: 200, found: true, message: null, user: user
                            }];
                    case 2:
                        if (!(options.id != undefined && options.email == undefined)) return [3, 4];
                        return [4, Authentication_model_1.default.findById(options.id)];
                    case 3:
                        user = _a.sent();
                        if (user == null)
                            return [2, {
                                    status: 404, found: false, message: "user doesn't exists!", user: null
                                }];
                        return [2, {
                                status: 200, found: true, message: null, user: user
                            }];
                    case 4:
                        if (!(options.id == undefined && options.email == undefined)) return [3, 6];
                        return [4, Authentication_model_1.default.find()];
                    case 5:
                        users = _a.sent();
                        if (users == null)
                            return [2, {
                                    status: 404, found: false, message: "users doesn't exists!", user: null
                                }];
                        return [2, {
                                status: 200, found: true, message: null, user: users
                            }];
                    case 6: return [2, {
                            status: 404, found: false, message: 'something went wrong! Try again.', user: null
                        }];
                    case 7: return [3, 9];
                    case 8:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, {
                                status: 500, found: false,
                                message: 'something went wrong! Try again.', user: null
                            }];
                    case 9: return [2];
                }
            });
        });
    };
    AuthenticationService.prototype.updateUser = function (user_id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, Authentication_model_1.default.findByIdAndUpdate(user_id, body)];
                    case 1:
                        user = _a.sent();
                        return [2, { status: 200, updated: true, message: 'user updated successfully!' }];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, {
                                status: 500, updated: false, message: 'something went wrong! Try again.'
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationService.prototype.changePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, Authentication_model_1.default.findByIdAndUpdate(id, { password: password })];
                    case 1:
                        user = _a.sent();
                        return [2, {
                                status: 200, changed: true, message: 'password changed successfully!'
                            }];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, { status: 500, changed: false, message: 'something went wrong! Try again.' }];
                    case 3: return [2];
                }
            });
        });
    };
    AuthenticationService.prototype.deleteUser = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, logs, i, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4, Authentication_model_1.default.findById(user_id).remove()];
                    case 1:
                        user = _a.sent();
                        return [4, Check_model_1.WebsiteLogModel.find({ user_id: user_id })];
                    case 2:
                        logs = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(logs.length > i)) return [3, 6];
                        return [4, logs[i].remove()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6: return [2, { status: 200, deleted: true, message: 'user deleted successfully' }];
                    case 7:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2, { status: 500, deleted: false, message: 'something went wrong! Try again.' }];
                    case 8: return [2];
                }
            });
        });
    };
    return AuthenticationService;
}());
exports.default = AuthenticationService;
