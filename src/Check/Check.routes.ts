import Router, { Request, Response, NextFunction } from "express";
import CheckWebsiteController from './Check.controller';
 
const website_logs_router = Router();
const check_website_controller:any = new CheckWebsiteController();

website_logs_router.get('/', check_website_controller.websiteLogs )

export default website_logs_router;