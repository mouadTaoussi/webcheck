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
var Authentication_service_1 = __importDefault(require("./Authentication.service"));
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
var userService = new Authentication_service_1.default();
var AuthenticationController = (function () {
    function AuthenticationController() {
    }
    AuthenticationController.prototype.getAuthenticatedUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, gettingUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = request.user;
                        return [4, userService.findUser({ email: undefined, id: user.id })];
                    case 1:
                        gettingUser = _a.sent();
                        gettingUser.user.password = undefined;
                        gettingUser.user.pushRegisteration = undefined;
                        response.status(gettingUser.status).send({
                            user: gettingUser.user, message: gettingUser.message
                        });
                        return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.pushServiceRegisteration = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, user, attached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        user = request.user;
                        return [4, userService.registerToPushService(user.id, body)];
                    case 1:
                        attached = _a.sent();
                        response.status(attached.status).send({
                            attached: attached.saved, message: attached.message
                        });
                        return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.loginUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, userEmail, matched, user_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        return [4, userService.findUser({ email: body.email, id: undefined })];
                    case 1:
                        userEmail = _a.sent();
                        if (!(userEmail.found == true)) return [3, 3];
                        return [4, bcrypt_1.compare(body.password, userEmail.user.password)];
                    case 2:
                        matched = _a.sent();
                        if (matched != true) {
                            response.status(404).send({ message: "credentials aren't correct!" });
                        }
                        else {
                            user_token = jsonwebtoken_1.sign({ id: userEmail.user._id, email: userEmail.user.email }, 'bgfgngf');
                            response.status(userEmail.status).send({ loggedin: true, message: "Logged in!", user_token: user_token });
                        }
                        return [3, 4];
                    case 3:
                        response.status(userEmail.status).send({ loggedin: false, message: "Incorrect credentials!", });
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.registerUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, emailExists, salt, hashed_password, new_user, user_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        return [4, userService.findUser({ email: body.email, id: undefined })];
                    case 1:
                        emailExists = _a.sent();
                        if (!(emailExists.found == true)) return [3, 2];
                        response.status(404).send({ registered: false, message: 'email already exists' });
                        return [3, 6];
                    case 2: return [4, bcrypt_1.genSalt(10)];
                    case 3:
                        salt = _a.sent();
                        return [4, bcrypt_1.hash(body.password, salt)];
                    case 4:
                        hashed_password = _a.sent();
                        body.password = hashed_password;
                        body.active = true;
                        body.websitesCount = 1;
                        return [4, userService.addUser(body)];
                    case 5:
                        new_user = _a.sent();
                        if (new_user.saved == true) {
                            user_token = jsonwebtoken_1.sign({ id: new_user.user._id, email: new_user.user.email }, 'bgfgngf');
                            response.status(new_user.status).send({ registered: true, message: "Registered successfully!", user_token: user_token });
                        }
                        else {
                            response.status(new_user.status).send({
                                message: "Something went wrong!"
                            });
                        }
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.resetPassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, user, password, salt, hashed_password, updatePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        return [4, userService.findUser({ id: undefined, email: body.email })];
                    case 1:
                        user = _a.sent();
                        if (!(user.found == true)) return [3, 5];
                        password = uuid_1.v4();
                        return [4, bcrypt_1.genSalt(10)];
                    case 2:
                        salt = _a.sent();
                        return [4, bcrypt_1.hash(password, salt)];
                    case 3:
                        hashed_password = _a.sent();
                        return [4, userService.changePassword(user.user._id, hashed_password)];
                    case 4:
                        updatePassword = _a.sent();
                        console.log(password);
                        response.status(updatePassword.status).send({
                            sent: true,
                            message: "email sent to your inbox!",
                        });
                        return [3, 6];
                    case 5:
                        response.status(404).send({
                            message: "Make sure to put a correct email!",
                            sent: false
                        });
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.updateUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, body, userEmail, updating, updating;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = request.user;
                        body = request.body;
                        return [4, userService.findUser({ email: body.email, id: undefined })];
                    case 1:
                        userEmail = _a.sent();
                        if (!(userEmail.found == true)) return [3, 5];
                        if (!(user.email == body.email)) return [3, 3];
                        return [4, userService.updateUser(user.id, body)];
                    case 2:
                        updating = _a.sent();
                        response.status(updating.status).send({
                            updated: updating.updated,
                            message: updating.message
                        });
                        return [3, 4];
                    case 3:
                        response.status(404).send({
                            updated: false,
                            message: "Email alreay provided!"
                        });
                        _a.label = 4;
                    case 4: return [3, 7];
                    case 5: return [4, userService.updateUser(user.id, body)];
                    case 6:
                        updating = _a.sent();
                        response.status(updating.status).send({
                            updated: updating.updated,
                            message: updating.message
                        });
                        _a.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.deleteUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var password, user, matched, user_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = request.query.password;
                        console.log(request.query);
                        if (!password) {
                            response.status(400).send({ message: "no password prvided!" });
                            response.end();
                        }
                        ;
                        return [4, userService.findUser({ email: undefined, id: request.user.id })];
                    case 1:
                        user = _a.sent();
                        if (!(user.found == true)) return [3, 6];
                        return [4, bcrypt_1.compare(password, user.user.password)];
                    case 2:
                        matched = _a.sent();
                        if (!matched) return [3, 4];
                        return [4, userService.deleteUser(request.user.id)];
                    case 3:
                        user_1 = _a.sent();
                        response.status(user_1.status).send({
                            deleted: user_1.deleted, message: user_1.message
                        });
                        return [3, 5];
                    case 4:
                        response.status(401).send({ message: 'Not authorized' });
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        response.status(401).send({ message: 'Not authorized' });
                        _a.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    AuthenticationController.prototype.Authenticated = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = request.query.token;
                        if (!!token) return [3, 1];
                        response.status(401).send({ message: "Not authenticated" });
                        return [3, 3];
                    case 1: return [4, jsonwebtoken_1.verify(token, "bgfgngf")];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            response.status(401).send({ message: 'token not valid', });
                        }
                        ;
                        request.user = user;
                        next();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    return AuthenticationController;
}());
exports.default = AuthenticationController;
