"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_config_1 = __importDefault(require("./main.config"));
function cors(request, response, next) {
    response.header("Access-Control-Allow-Origin", main_config_1.default.front_end_origin);
    response.header("Access-Control-Allow-Credentials", true);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Content-Type,Authorization');
    next();
}
exports.default = cors;
;
