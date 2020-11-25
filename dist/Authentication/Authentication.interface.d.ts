import { Response, NextFunction } from 'express';
declare type websiteType = {
    name: string;
    description: string;
    active: boolean | undefined;
    website: string;
    _id: string | undefined;
};
declare type userWebsites = [
    websiteType | websiteType,
    websiteType | websiteType,
    websiteType,
    websiteType
];
interface subscriptionObject {
    endpoint: string;
    expirationTime: unknown;
    keys: {
        p256dh: string;
        auth: string;
    };
}
interface UserBody {
    name: string;
    email: string;
    password: string;
    password2: string;
    active: boolean;
    websitesCount: number;
    websites: userWebsites | [];
}
interface UserInterface {
    _id: string | undefined;
    name: string;
    email: string;
    password: string | undefined;
    active: boolean;
    receivingEmail: boolean;
    displayTheme: string;
    websitesCount: number;
    websites: userWebsites | [];
    pushRegisteration: subscriptionObject;
}
interface UserUpdate {
    name: string | undefined;
    email: string | undefined;
    receivingEmail: string | undefined;
    active: boolean | undefined;
    displayTheme: string | undefined;
}
interface AuthenticationControllerInterface {
    getAuthenticatedUser(request: any, response: Response): Promise<void>;
    pushServiceRegisteration(request: any, response: Response): Promise<void>;
    loginUser(request: any, response: Response): Promise<void>;
    registerUser(request: any, response: Response): Promise<void>;
    resetPassword(request: any, response: Response): Promise<void>;
    updateUser(request: any, response: Response): Promise<void>;
    deleteUser(request: any, response: Response): Promise<void>;
    Authenticated(request: any, response: Response, next: NextFunction): Promise<void>;
}
interface AuthenticationServiceInterface {
    registerToPushService(user_id: string, object: subscriptionObject): Promise<{
        status: number;
        saved: boolean;
        message: string | null;
    }>;
    addUser(body: UserBody): Promise<{
        status: number;
        saved: boolean;
        user: any;
        message: string | null;
    }>;
    findUser(options: {
        id: string | undefined;
        email: string | undefined;
    }): Promise<{
        status: number;
        found: boolean;
        message: string | null;
        user: any;
    }>;
    updateUser(user_id: string, body: UserUpdate): Promise<{
        status: number;
        updated: boolean;
        message: string;
    }>;
    changePassword(id: string, password: string): Promise<{
        status: number;
        changed: boolean;
        message: string;
    }>;
    deleteUser(user_id: string): Promise<{
        status: number;
        deleted: boolean;
        message: string;
    }>;
}
export { UserInterface, AuthenticationControllerInterface, AuthenticationServiceInterface, websiteType, UserBody, UserUpdate, subscriptionObject };
