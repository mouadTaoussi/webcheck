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
var Check_model_1 = require("./Check/Check.model");
var Authentication_model_1 = __importDefault(require("./Authentication/Authentication.model"));
var mongoose_1 = require("mongoose");
var main_config_1 = __importDefault(require("./main.config"));
mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
var Migration = (function () {
    function Migration() {
    }
    Migration.prototype.up = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, i, io, WRTID, WATID, newInstance, newInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Authentication_model_1.default.find({})];
                    case 1:
                        users = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < users.length)) return [3, 13];
                        io = 0;
                        _a.label = 3;
                    case 3:
                        if (!(io < users[i].websites.length)) return [3, 12];
                        return [4, Check_model_1.websitesResponsesTimeInDayModel.findOne({ user_id: users[i]._id, website_id: users[i].websites[io]._id })];
                    case 4:
                        WRTID = _a.sent();
                        return [4, Check_model_1.websiteAverageTimeInDayModel.findOne({ user_id: users[i]._id, website_id: users[i].websites[io]._id })];
                    case 5:
                        WATID = _a.sent();
                        if (!(WRTID == null)) return [3, 7];
                        newInstance = new Check_model_1.websitesResponsesTimeInDayModel({
                            user_id: users[i]._id,
                            website_id: users[i].websites[io]._id,
                            response_times_melliseconds: []
                        });
                        return [4, newInstance.save()];
                    case 6:
                        _a.sent();
                        return [3, 8];
                    case 7: return [3, 11];
                    case 8:
                        if (!(WATID == null)) return [3, 10];
                        newInstance = new Check_model_1.websiteAverageTimeInDayModel({
                            user_id: users[i]._id,
                            website_id: users[i].websites[io]._id,
                            website_name: users[i].websites[io].name,
                            website_speed_last_ten_days: []
                        });
                        return [4, newInstance.save()];
                    case 9:
                        _a.sent();
                        return [3, 11];
                    case 10: return [3, 11];
                    case 11:
                        io++;
                        return [3, 3];
                    case 12:
                        i++;
                        return [3, 2];
                    case 13: return [2];
                }
            });
        });
    };
    Migration.prototype.down = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    return Migration;
}());
new Migration().up();
