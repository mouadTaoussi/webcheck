"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
require("cookie-session");
const mongoose_1 = require("mongoose");
const main_config_1 = __importDefault(require("./main.config"));
const Authentication_corsPolicy_1 = __importDefault(require("./Authentication/Authentication.corsPolicy"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const Check_routes_1 = __importDefault(require("./Check/Check.routes"));
const Authentication_routes_1 = __importDefault(require("./Authentication/Authentication.routes"));
require("./Check/Check.scheduledjobs");
const main_graphql_1 = require("./GraphQL/main.graphql");
const MODE = process.env.INDEV == "development" ? "development" : "production";
async function runapp() {
    var app = express_1.default();
    const ServerOfApollo = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [main_graphql_1.websiteResolver],
            validate: true
        }),
        context: ({ req, res }) => ({ req, res }),
        playground: true,
    });
    ServerOfApollo.applyMiddleware({ app });
    app.use('/', express_1.default.static(__dirname + "/../wc-front-end/dist"));
    app.use(helmet_1.default());
    app.use(body_parser_1.default.json());
    app.use('/auth', Authentication_corsPolicy_1.default, Authentication_routes_1.default);
    app.use('/check', Authentication_corsPolicy_1.default, Check_routes_1.default);
    mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Database up and running!');
        }
    });
    const PORT = main_config_1.default.port_dev || main_config_1.default.port;
    app.listen(PORT);
    console.log("Server up and running at " + MODE + " mode at port " + PORT);
}
runapp();
