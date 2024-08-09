import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private configService;
    private readonly users;
    constructor(configService: ConfigService);
    findOne(username: string): Promise<any | undefined>;
}
