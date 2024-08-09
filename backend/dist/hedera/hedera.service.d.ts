import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from "@hashgraph/sdk";
export declare class HederaService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private readonly logger;
    private client;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private initializeClient;
    getClient(): Client;
    createAccount(): Promise<{
        accountId: string;
        privateKey: string;
    }>;
    getAccountBalance(accountId: string): Promise<string>;
    getCollectionsForAccount(accountId: string): Promise<string[]>;
    getNFTsInCollection(collectionId: string, limit?: number, startAfter?: number): Promise<any[]>;
    transferHbar(from: string, to: string, amount: number): Promise<string>;
    createNFTCollection(name: string, symbol: string): Promise<string>;
    mintNFT(collectionId: string, metadata: any): Promise<string>;
    private createImmutableFile;
    getFileContents(fileId: string): Promise<any>;
    getCollectionInfo(tokenId: string): Promise<any>;
    getNFTInfo(tokenId: string, serialNumber: string): Promise<any>;
    createTopic(assetData: any): Promise<string>;
    submitMessage(topicId: string, message: string): Promise<string>;
    getMessages(topicId: any, startTime: any, messageCount: any, timeout: any): Promise<unknown>;
    private executeWithRetry;
}
