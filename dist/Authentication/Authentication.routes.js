"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Authentication_controller_1 = __importDefault(require("./Authentication.controller"));
var authentication_router = express_1.default();
var AuthController = new Authentication_controller_1.default();
authentication_router.get('/', AuthController.Authenticated, AuthController.getAuthenticatedUser);
authentication_router.post('/pushServiceRegisteration', AuthController.Authenticated, AuthController.pushServiceRegisteration);
authentication_router.post('/login', AuthController.loginUser);
authentication_router.post('/register', AuthController.registerUser);
authentication_router.post('/resetPassword', AuthController.resetPassword);
authentication_router.put('/updateUser', AuthController.Authenticated, AuthController.updateUser);
authentication_router.delete('/deleteUser', AuthController.Authenticated, AuthController.deleteUser);
exports.default = authentication_router;
