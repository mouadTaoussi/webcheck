"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const resolvers_graphql_1 = require("./Check/resolvers.graphql");
const apollo_server_express_1 = require("apollo-server-express");
async function runapolloserver() {
    const ServerOfApollo = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [resolvers_graphql_1.websiteResolver]
        }),
        playground: true
    });
}
runapolloserver();
