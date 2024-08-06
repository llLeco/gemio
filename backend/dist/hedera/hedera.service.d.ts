import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Client } from "@hashgraph/sdk";
export declare class HederaService implements OnModuleInit, OnModuleDestroy {
    private cacheManager;
    private configService;
    private readonly logger;
    private client;
    private network;
    private topicId;
    constructor(cacheManager: Cache, configService: ConfigService);
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
    getNFTsInCollection(collectionId: string): Promise<any[]>;
    transferHbar(from: string, to: string, amount: number): Promise<string>;
    createNFTCollection(name: string, symbol: string): Promise<string>;
    mintNFT(tokenId: string, metadata: any): Promise<string>;
    getNFTInfo(tokenId: string): Promise<any>;
    createFile(contents: string): Promise<string>;
    updateFile(fileId: string, newContents: string): Promise<void>;
    getFileContents(fileId: string): Promise<string>;
    appendToFile(fileId: string, newContents: string): Promise<void>;
    createTopic(assetData: any): Promise<string>;
    submitMessage(topicId: string, message: string): Promise<string>;
    getMessages(topicId: string, startTime: Date, messageCount: number, timeout: number): Promise<string[]>;
    private executeWithRetry;
}
