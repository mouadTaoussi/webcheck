"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cors(request, response, next) {
    response.header("Access-Control-Allow-Origin", 'https://webcheck.vercel.app');
    response.header("Access-Control-Allow-Credentials", true);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Content-Type,Authorization');
    next();
}
exports.default = cors;
;
