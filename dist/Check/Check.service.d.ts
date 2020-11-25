import { CheckWebsiteServiceInterface } from './Check.interface';
import { websiteType } from '.././Authentication/Authentication.interface';
declare class CheckWebsitesService implements CheckWebsiteServiceInterface {
    private websitelogmodel;
    private statusCodes;
    constructor();
    addWebsite(user_id: string, website: websiteType): Promise<{
        status: number;
        message: string | null;
        data: any | null;
    }>;
    deleteWebsite(user_id: string, website_id: string): Promise<{
        status: number;
        message: string | null;
    }>;
    pushLog(status_code: number, user_id: string, website_id: string): Promise<{
        status: number;
        message: string | null;
        data: any | null;
    }>;
    getLogs(user_id: string): Promise<{
        status: number;
        message: string | null;
        data: any | null;
    }>;
    deleteLogs(user_id: string, website_id: string | undefined): Promise<{
        status: number;
        message: string | null;
        data: any | null;
    }>;
}
export default CheckWebsitesService;
