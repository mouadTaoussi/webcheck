import { Request, Response } from 'express';
import { websiteType, subscriptionObject } from '.././Authentication/Authentication.interface';
interface CheckWebsiteControllerInterface {
    addWebsite(request: Request, response: Response): Promise<void>;
    deleteWebsite(request: any, response: Response): Promise<void>;
    websiteLogs(request: Request, response: Response): Promise<void>;
    deleteWebsiteLogs(request: Request, response: Response): Promise<void>;
    handlePushAndEmail(registeration: subscriptionObject, options: handlePushAndEmailOptions): Promise<void>;
    checkEveryWebsiteExists(): Promise<void>;
}
declare type handlePushAndEmailOptions = {
    message: string;
    url: string;
    status_code: number;
    user_id: string;
    website_id: string;
};
interface CheckWebsiteServiceInterface {
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
    getLogs(user_id: string, website_id: string): Promise<{
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
interface WebsiteLog {
    user_id: string;
    website_id: string;
    statu_Code: string;
    explanation: string;
    when_it_down: string;
    log_id: string;
}
declare type ServerStatusCodesType<GenericType> = [
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    },
    {
        code: number;
        description: GenericType;
    }
];
export { CheckWebsiteControllerInterface, CheckWebsiteServiceInterface, ServerStatusCodesType, WebsiteLog, handlePushAndEmailOptions };
