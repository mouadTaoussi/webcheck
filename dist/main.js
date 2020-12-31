"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
require("./GraphQL/main.graphql");
var application = express_1.default();
application.use('/', express_1.default.static(__dirname + "/../wc-front-end/dist"));
application.use(helmet_1.default());
application.use(body_parser_1.default.json());
application.use('/auth', Authentication_corsPolicy_1.default, Authentication_routes_1.default);
application.use('/check', Authentication_corsPolicy_1.default, Check_routes_1.default);
mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
const PORT = main_config_1.default.port_dev || main_config_1.default.port;
application.listen(PORT);
console.log("Server up and running at port " + PORT);
