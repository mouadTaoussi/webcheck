import Router, { Request, Response, NextFunction } from "express";
import CheckWebsiteController from './Check.controller';
import AuthenticationController from '.././Authentication/Authentication.controller';
import cors from './Check.corsPolicy';
 
const website_logs_router          = Router();
const check_website_controller:any = new CheckWebsiteController();
const AuthController               = new AuthenticationController();

// website_logs_router.get ('/',                 cors, AuthController.Authenticated, check_website_controller.userWebsites )
website_logs_router.delete('/deleteWebsite', AuthController.Authenticated, check_website_controller.deleteWebsite )
website_logs_router.post  ('/add',           AuthController.Authenticated, check_website_controller.addWebsite )
website_logs_router.get   ('/logs',          AuthController.Authenticated, check_website_controller.websiteLogs )
website_logs_router.delete('/clearLogs',     AuthController.Authenticated, check_website_controller.deleteWebsiteLogs )

export default website_logs_router;