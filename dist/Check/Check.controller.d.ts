import { CheckWebsiteControllerInterface, handlePushAndEmailOptions } from './Check.interface';
import { subscriptionObject } from '.././Authentication/Authentication.interface';
import { Response } from 'express';
declare class CheckWebsiteController implements CheckWebsiteControllerInterface {
    private websitesLogService;
    private vapidPublicKey;
    private vapidPrivateKey;
    constructor();
    addWebsite(request: any, response: Response): Promise<void>;
    deleteWebsite(request: any, response: Response): Promise<void>;
    websiteLogs(request: any, response: Response): Promise<void>;
    deleteWebsiteLogs(request: any, response: Response): Promise<void>;
    handlePushAndEmail(registeration: subscriptionObject, options: handlePushAndEmailOptions): Promise<void>;
    checkEveryWebsiteExists(): Promise<void>;
}
export default CheckWebsiteController;
