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
var Check_model_1 = __importDefault(require("./Check.model"));
var Authentication_model_1 = __importDefault(require(".././Authentication/Authentication.model"));
var uuid_1 = require("uuid");
var moment_1 = __importDefault(require("moment"));
var CheckWebsitesService = (function () {
    function CheckWebsitesService() {
        this.websitelogmodel = Check_model_1.default;
        this.statusCodes = [
            { code: 404, description: "Might be you entered a wrong website Url" },
            { code: 500, description: "Internal Server Error" },
            { code: 501, description: "Not Implemented: The server either does not recognize the request method,or it lacks the ability to fulfil the request." },
            { code: 502, description: "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream." },
            { code: 503, description: "Service Unavailable: The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state." },
            { code: 504, description: "Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server." },
            { code: 505, description: "HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request." },
            { code: 506, description: "Variant Also Negotiates (RFC 2295): Transparent content negotiation for the request results in a circular reference." },
            { code: 507, description: "Insufficient Storage (WebDAV; RFC 4918): The server is unable to store the representation needed to complete the request." },
            { code: 509, description: "Loop Detected (WebDAV; RFC 5842): The server detected an infinite loop while processing the request (sent instead of 208 Already Reported)." },
            { code: 510, description: "Not Extended (RFC 2774): Further extensions to the request are required for the server to fulfil it." },
            { code: 511, description: "Network Authentication Required (RFC 6585)." }
        ];
    }
    CheckWebsitesService.prototype.addWebsite = function (user_id, website) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userWebsites, plusOne, update, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, Authentication_model_1.default.findOne({ _id: user_id })];
                    case 1:
                        user = _a.sent();
                        if (!(user.websitesCount < 3)) return [3, 3];
                        userWebsites = user.websites;
                        plusOne = user.websitesCount + 1;
                        website.active = true;
                        userWebsites.push(website);
                        return [4, Authentication_model_1.default.findByIdAndUpdate(user_id, {
                                websitesCount: plusOne,
                                websites: userWebsites
                            })];
                    case 2:
                        update = _a.sent();
                        return [2, {
                                status: 200, message: 'A NEW WEBSITE ADDED!!', data: website
                            }];
                    case 3: return [2, {
                            status: 200, message: 'You cannot add more than 3 websites!!',
                            data: null
                        }];
                    case 4: return [3, 6];
                    case 5:
                        error_1 = _a.sent();
                        return [2, {
                                status: 500, message: "Something went wrong!", data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    CheckWebsitesService.prototype.deleteWebsite = function (user_id, website_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, websites, websitesNotDeleted, i, decreaseOne, update, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, Authentication_model_1.default.findOne({ _id: user_id })];
                    case 1:
                        user = _a.sent();
                        websites = user.websites;
                        websitesNotDeleted = [];
                        for (i = 0; i < websites.length; i++) {
                            if (websites[i]._id.toString() == website_id.toString()) {
                                continue;
                            }
                            else {
                                websitesNotDeleted.push(websites[i]);
                            }
                        }
                        decreaseOne = user.websitesCount - 1;
                        return [4, Authentication_model_1.default.findByIdAndUpdate(user_id, {
                                websitesCount: decreaseOne,
                                websites: websitesNotDeleted
                            })];
                    case 2:
                        update = _a.sent();
                        return [2, { status: 200, message: "Website deleted successfully", }];
                    case 3:
                        error_2 = _a.sent();
                        return [2, { status: 500, message: "Something went wrong!", }];
                    case 4: return [2];
                }
            });
        });
    };
    CheckWebsitesService.prototype.pushLog = function (status_code, user_id, website_id) {
        return __awaiter(this, void 0, void 0, function () {
            var explanation, saving, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        explanation = this.statusCodes.filter(function (statuscode) {
                            return statuscode.code == status_code;
                        })[0];
                        saving = new Check_model_1.default({
                            user_id: user_id,
                            website_id: website_id,
                            status_code: status_code,
                            explanation: explanation.description,
                            whenitdown: moment_1.default().format('MMMM Do YYYY, h:mm:ss a'),
                            log_id: uuid_1.v4()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, saving.save()];
                    case 2:
                        _a.sent();
                        return [2, {
                                status: 200, message: null, data: null
                            }];
                    case 3:
                        error_3 = _a.sent();
                        return [2, {
                                status: 500, message: "Something went wrong!", data: null
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    CheckWebsitesService.prototype.getLogs = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, logs, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, Authentication_model_1.default.findOne({ _id: user_id })];
                    case 1:
                        user = _a.sent();
                        return [4, Check_model_1.default.find({
                                user_id: user._id
                            })];
                    case 2:
                        logs = _a.sent();
                        return [2, { status: 200, message: null, data: logs }];
                    case 3:
                        error_4 = _a.sent();
                        return [2, {
                                status: 500, message: "Something went wrong!", data: null
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    CheckWebsitesService.prototype.deleteLogs = function (user_id, website_id) {
        return __awaiter(this, void 0, void 0, function () {
            var logs, i, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4, Check_model_1.default.find({ user_id: user_id })];
                    case 1:
                        logs = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(logs.length > i)) return [3, 5];
                        return [4, logs[i].remove()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2, { status: 200, message: "Logs has been deleted successfully", data: null }];
                    case 6:
                        error_5 = _a.sent();
                        return [2, {
                                status: 500, message: "Something went wrong!", data: null
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    return CheckWebsitesService;
}());
exports.default = CheckWebsitesService;
