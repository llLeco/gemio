import { User } from './user.model';
export declare class UsersService {
    private readonly users;
    findOne(username: string): Promise<User | undefined>;
    findByHederaAccountId(hederaAccountId: string): Promise<User | undefined>;
    create(user: User): Promise<User>;
}
