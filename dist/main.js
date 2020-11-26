"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("cookie-session");
var mongoose_1 = require("mongoose");
var main_config_1 = __importDefault(require("./main.config"));
var Authentication_corsPolicy_1 = __importDefault(require("./Authentication/Authentication.corsPolicy"));
var helmet_1 = __importDefault(require("helmet"));
var body_parser_1 = __importDefault(require("body-parser"));
var Check_routes_1 = __importDefault(require("./Check/Check.routes"));
var Authentication_routes_1 = __importDefault(require("./Authentication/Authentication.routes"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
var application = express_1.default();
application.use('/', express_1.default.static(__dirname + "/../wc-front-end/dist"));
application.use(helmet_1.default());
application.use(body_parser_1.default.json());
application.use('/auth', Authentication_corsPolicy_1.default, Authentication_routes_1.default);
application.use('/check', Authentication_corsPolicy_1.default, Check_routes_1.default);
mongoose_1.connect(main_config_1.default.database_connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Database up and running!');
    }
});
var PORT = process.env.PORT_DEV || process.env.PORT;
application.listen(PORT);
console.log("Server up and running at port " + PORT);
