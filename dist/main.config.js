"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_config = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    database_connection: process.env.DATABASE_CONNECTION,
    vapid_public_key: process.env.VAPID_PUBLIC_KEY,
    vapid_private_key: process.env.VAPID_PRIVATE_KEY,
    port_dev: process.env.PORT_DEV,
    port: process.env.PORT
};
exports.default = application_config;
