import { AuthenticationServiceInterface, UserBody, UserUpdate, subscriptionObject } from './Authentication.interface';
declare class AuthenticationService implements AuthenticationServiceInterface {
    private usermodel;
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
export default AuthenticationService;
