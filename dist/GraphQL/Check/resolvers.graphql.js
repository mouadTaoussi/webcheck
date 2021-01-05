"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedefinitions_graphql_1 = require("./typedefinitions.graphql");
const Check_service_1 = __importDefault(require("../.././Check/Check.service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const main_config_1 = __importDefault(require("../.././main.config"));
let websiteResolver = class websiteResolver {
    constructor() {
        this.websiteService = new Check_service_1.default();
    }
    async getAverageResponseTimeForUserWebsites(user_token) {
        const user = await jsonwebtoken_1.verify(user_token, main_config_1.default.jwt_secret);
        const data = await this.websiteService.getAverageTimeForWebsite(undefined, user.id);
        return data.data;
    }
    async getAverageResponseTimeForWebsite(website_id) {
        const data = await this.websiteService.getAverageTimeForWebsite(website_id, undefined);
        return data.data;
    }
};
__decorate([
    type_graphql_1.Query(() => [typedefinitions_graphql_1.websiteAverageTimeInDaySchema]),
    __param(0, type_graphql_1.Arg('user_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], websiteResolver.prototype, "getAverageResponseTimeForUserWebsites", null);
__decorate([
    type_graphql_1.Query(() => typedefinitions_graphql_1.websiteAverageTimeInDaySchema),
    __param(0, type_graphql_1.Arg('website_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], websiteResolver.prototype, "getAverageResponseTimeForWebsite", null);
websiteResolver = __decorate([
    type_graphql_1.Resolver(of => typedefinitions_graphql_1.websiteAverageTimeInDaySchema),
    __metadata("design:paramtypes", [])
], websiteResolver);
exports.websiteResolver = websiteResolver;
