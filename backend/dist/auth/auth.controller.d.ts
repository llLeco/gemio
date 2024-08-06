import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
        hederaAccountId: any;
        username: any;
    }>;
    register(userData: {
        username: string;
        password: string;
        email: string;
        hederaAccountId: string;
    }): Promise<{
        hederaAccountId: string;
        username: string;
        email: string;
        role: string;
    }>;
}
