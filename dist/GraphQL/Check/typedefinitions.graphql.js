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
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteAverageTimeInDaySchema = void 0;
const type_graphql_1 = require("type-graphql");
let WebsiteSpeedEntity = class WebsiteSpeedEntity {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", Number)
], WebsiteSpeedEntity.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], WebsiteSpeedEntity.prototype, "value", void 0);
WebsiteSpeedEntity = __decorate([
    type_graphql_1.ObjectType({ description: "This represents average response time about websites in a day" })
], WebsiteSpeedEntity);
let websiteAverageTimeInDaySchema = class websiteAverageTimeInDaySchema {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], websiteAverageTimeInDaySchema.prototype, "website_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], websiteAverageTimeInDaySchema.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: false }),
    __metadata("design:type", String)
], websiteAverageTimeInDaySchema.prototype, "website_name", void 0);
__decorate([
    type_graphql_1.Field(type => [WebsiteSpeedEntity], { nullable: true }),
    __metadata("design:type", Array)
], websiteAverageTimeInDaySchema.prototype, "website_speed_last_ten_days", void 0);
websiteAverageTimeInDaySchema = __decorate([
    type_graphql_1.ObjectType({ description: "This represents average response time about websites" })
], websiteAverageTimeInDaySchema);
exports.websiteAverageTimeInDaySchema = websiteAverageTimeInDaySchema;
