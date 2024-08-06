import { HederaService } from './hedera.service';
export declare class HederaController {
    private readonly hederaService;
    constructor(hederaService: HederaService);
    createAccount(): Promise<{
        accountId: string;
        privateKey: string;
    }>;
    getBalance(accountId: string): Promise<string>;
    transferHbar(from: string, to: string, amount: number): Promise<string>;
    createNFTCollection(body: {
        name: string;
        symbol: string;
    }): Promise<string>;
    mintNFT(body: {
        tokenId: string;
        metadata: string;
    }): Promise<string>;
    getNFTInfo(tokenId: string): Promise<any>;
    getMessages(topicId: string, startTime: string): Promise<string[]>;
}
