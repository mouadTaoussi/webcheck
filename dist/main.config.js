"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_config = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    database_connection: process.env.DATABASE_CONNECTION,
    vapid_public_key: process.env.VAPID_PUBLIC_KEY,
    vapid_private_key: process.env.VAPID_PRIVATE_KEY,
    port_dev: process.env.PORT_DEV,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    front_end_origin: "*",
    websites_limit: 6,
};
exports.default = application_config;
