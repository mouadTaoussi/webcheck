"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const application_config = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    database_connection: process.env.DATABASE_CONNECTION,
    vapid_public_key: process.env.VAPID_PUBLIC_KEY,
    vapid_private_key: process.env.VAPID_PRIVATE_KEY,
    port_dev: process.env.PORT_DEV,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET
};
exports.default = application_config;
