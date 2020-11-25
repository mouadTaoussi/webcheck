import { AuthenticationControllerInterface } from './Authentication.interface';
import { Request, Response, NextFunction } from 'express';
declare class AuthenticationController implements AuthenticationControllerInterface {
    getAuthenticatedUser(request: any, response: Response): Promise<void>;
    pushServiceRegisteration(request: any, response: Response): Promise<void>;
    loginUser(request: any, response: Response): Promise<void>;
    registerUser(request: any, response: Response): Promise<void>;
    resetPassword(request: any, response: Response): Promise<void>;
    updateUser(request: any, response: Response): Promise<void>;
    deleteUser(request: any, response: Response): Promise<void>;
    Authenticated(request: Request | any, response: Response, next: NextFunction): Promise<void>;
}
export default AuthenticationController;
