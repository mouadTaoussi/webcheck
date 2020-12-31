"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userWebsiteSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    active: { type: Boolean },
    website: { type: String }
});
const keysSchema = new mongoose_1.Schema({
    p256dh: { type: String, required: true, default: null },
    auth: { type: String, required: true, default: null }
});
const pushSubscriptionSchema = new mongoose_1.Schema({
    endpoint: { type: String, required: true, default: null },
    expirationTime: { type: String || Number, default: null },
    keys: keysSchema
});
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    receivingEmail: { type: Boolean, default: true, required: true },
    displayTheme: { type: String, default: "light", required: true },
    websitesCount: { type: Number, required: true },
    websites: [userWebsiteSchema],
    pushRegisteration: {
        endpoint: { type: String || null, required: false, default: null },
        expirationTime: { type: String || Number || null, required: false, default: null },
        keys: {
            p256dh: { type: String || null, required: false, default: null },
            auth: { type: String || null, required: false, default: null }
        }
    }
});
const UserModel = mongoose_1.model("users", UserSchema);
exports.default = UserModel;
