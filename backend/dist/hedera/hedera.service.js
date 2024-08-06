"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HederaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_2 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const buffer_1 = require("buffer");
const rxjs_1 = require("rxjs");
const sdk_1 = require("@hashgraph/sdk");
let HederaService = HederaService_1 = class HederaService {
    constructor(cacheManager, configService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.logger = new common_1.Logger(HederaService_1.name);
    }
    async onModuleInit() {
        await this.initializeClient();
    }
    async onModuleDestroy() {
        if (this.client) {
            await this.client.close();
        }
    }
    async initializeClient() {
        const myAccountId = sdk_1.AccountId.fromString(this.configService.get('HEDERA_ACCOUNT_ID'));
        const myPrivateKey = sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));
        if (this.configService.get('HEDERA_NETWORK') !== 'mainnet') {
            this.client = sdk_1.Client.forTestnet();
            this.logger.log('Initialized Hedera client for testnet');
        }
        else {
            this.client = sdk_1.Client.forMainnet();
            this.logger.log('Initialized Hedera client for mainnet');
        }
        this.client.setOperator(myAccountId, myPrivateKey);
        this.logger.log(`Hedera client operator set to account: ${myAccountId.toString()}`);
        if (!this.client) {
            throw new Error('Hedera client was not initialized properly');
        }
    }
    getClient() {
        return this.client;
    }
    async createAccount() {
        const newAccountPrivateKey = sdk_1.PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
        const newAccount = await this.executeWithRetry(() => new sdk_1.AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(sdk_1.Hbar.fromTinybars(1000))
            .execute(this.client));
        const getReceipt = await newAccount.getReceipt(this.client);
        const newAccountId = getReceipt.accountId;
        return {
            accountId: newAccountId.toString(),
            privateKey: newAccountPrivateKey.toString(),
        };
    }
    async getAccountBalance(accountId) {
        const balance = await this.executeWithRetry(() => new sdk_1.AccountBalanceQuery()
            .setAccountId(sdk_1.AccountId.fromString(accountId))
            .execute(this.client));
        return balance.hbars.toString();
    }
    async getCollectionsForAccount(accountId) {
        const collections = [];
        const account = sdk_1.AccountId.fromString(accountId);
        try {
            const accountInfo = await new sdk_1.AccountInfoQuery()
                .setAccountId(account)
                .execute(this.client);
            const tokenRelationships = accountInfo.tokenRelationships;
            for (const [tokenIdStr, relationship] of tokenRelationships._map.entries()) {
                const tokenId = sdk_1.TokenId.fromString(tokenIdStr);
                const tokenInfo = await new sdk_1.TokenInfoQuery()
                    .setTokenId(tokenId)
                    .execute(this.client);
                if (tokenInfo.tokenType.toString() === 'NON_FUNGIBLE_UNIQUE') {
                    collections.push(tokenIdStr);
                }
            }
        }
        catch (error) {
            this.logger.error(`Error fetching collections for account ${accountId}:`, error);
        }
        return collections;
    }
    async getNFTsInCollection(collectionId) {
        console.log('Fetching NFTs for collection:', collectionId);
        const nfts = [];
        const tokenId = sdk_1.TokenId.fromString(collectionId);
        if (collectionId === '0.0.2666544') {
            this.logger.warn(`Skipping token ${collectionId} as it is the HBAR token on testnet.`);
            return nfts;
        }
        try {
            const tokenInfo = await new sdk_1.TokenInfoQuery()
                .setTokenId(tokenId)
                .execute(this.client);
            if (tokenInfo.tokenType.toString() !== 'NON_FUNGIBLE_UNIQUE') {
                this.logger.warn(`Token ${collectionId} is not an NFT collection.`);
                return nfts;
            }
            const totalSupply = tokenInfo.totalSupply.toNumber();
            const nftPromises = Array.from({ length: totalSupply }, (_, i) => i + 1).map(async (serialNumber) => {
                try {
                    const nftInfoQuery = await new sdk_1.TokenNftInfoQuery()
                        .setNftId(new sdk_1.NftId(tokenId, serialNumber))
                        .execute(this.client);
                    const nftInfo = nftInfoQuery[0];
                    if (nftInfo.accountId && nftInfo.creationTime) {
                        const metadata = buffer_1.Buffer.from(nftInfo.metadata).toString('utf8');
                        const creationTime = new Date(nftInfo.creationTime.seconds.low * 1000 + nftInfo.creationTime.nanos.low / 1000000);
                        if (metadata && creationTime) {
                            return {
                                serialNumber: serialNumber.toString(),
                                owner: nftInfo.accountId.toString(),
                                metadata,
                                creationTime,
                            };
                        }
                    }
                    this.logger.warn(`NFT ${serialNumber} in collection ${collectionId} has incomplete data.`);
                }
                catch (nftError) {
                    if (nftError.name === 'StatusError' && nftError.status === 'INVALID_NFT_ID') {
                        this.logger.warn(`NFT ${serialNumber} in collection ${collectionId} does not exist.`);
                    }
                    else {
                        this.logger.error(`Error fetching NFT ${serialNumber} from collection ${collectionId}:`, nftError);
                    }
                }
                return null;
            });
            const nftResults = await Promise.all(nftPromises);
            return nftResults.filter(nft => nft !== null);
        }
        catch (error) {
            this.logger.error(`Error fetching NFTs for collection ${collectionId}:`, error);
            return nfts;
        }
    }
    async transferHbar(from, to, amount) {
        const transferTransaction = await this.executeWithRetry(() => new sdk_1.TransferTransaction()
            .addHbarTransfer(sdk_1.AccountId.fromString(from), sdk_1.Hbar.fromTinybars(-amount))
            .addHbarTransfer(sdk_1.AccountId.fromString(to), sdk_1.Hbar.fromTinybars(amount))
            .execute(this.client));
        const transactionReceipt = await transferTransaction.getReceipt(this.client);
        return transactionReceipt.status.toString();
    }
    async createNFTCollection(name, symbol) {
        const treasuryAccountId = sdk_1.AccountId.fromString(this.configService.get('HEDERA_ACCOUNT_ID'));
        const treasuryKey = sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));
        const nftCreate = await new sdk_1.TokenCreateTransaction()
            .setTokenName(name)
            .setTokenSymbol(symbol)
            .setTokenType(sdk_1.TokenType.NonFungibleUnique)
            .setDecimals(0)
            .setInitialSupply(0)
            .setTreasuryAccountId(treasuryAccountId)
            .setSupplyType(sdk_1.TokenSupplyType.Finite)
            .setMaxSupply(250)
            .setSupplyKey(treasuryKey)
            .freezeWith(this.client);
        const nftCreateTxSign = await nftCreate.sign(treasuryKey);
        const nftCreateSubmit = await this.executeWithRetry(() => nftCreateTxSign.execute(this.client));
        const nftCreateRx = await nftCreateSubmit.getReceipt(this.client);
        const tokenId = nftCreateRx.tokenId;
        this.logger.log(`Created NFT with Token ID: ${tokenId}`);
        return tokenId.toString();
    }
    async mintNFT(tokenId, metadata) {
        const supplyKey = sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));
        const mintTx = await new sdk_1.TokenMintTransaction()
            .setTokenId(tokenId)
            .setMetadata([buffer_1.Buffer.from(metadata)])
            .freezeWith(this.client);
        const mintTxSign = await mintTx.sign(supplyKey);
        const mintTxSubmit = await this.executeWithRetry(() => mintTxSign.execute(this.client));
        const mintRx = await mintTxSubmit.getReceipt(this.client);
        this.logger.log(`Created NFT ${tokenId} with serial: ${mintRx.serials[0].low}`);
        return mintRx.serials[0].low.toString();
    }
    async getNFTInfo(tokenId) {
        const cacheKey = `nftInfo:${tokenId}`;
        const cachedInfo = await this.cacheManager.get(cacheKey);
        if (cachedInfo) {
            return cachedInfo;
        }
        const query = new sdk_1.TokenInfoQuery().setTokenId(tokenId);
        const tokenInfo = await this.executeWithRetry(() => query.execute(this.client));
        const info = {
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            totalSupply: tokenInfo.totalSupply.toString(),
            maxSupply: tokenInfo.maxSupply.toString(),
        };
        await this.cacheManager.set(cacheKey, info, 300000);
        return info;
    }
    async createFile(contents) {
        const transaction = new sdk_1.FileCreateTransaction()
            .setKeys([sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'))])
            .setContents(contents)
            .setMaxTransactionFee(new sdk_1.Hbar(2))
            .freezeWith(this.client);
        const signTx = await transaction.sign(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
        const submitTx = await this.executeWithRetry(() => signTx.execute(this.client));
        const receipt = await submitTx.getReceipt(this.client);
        const fileId = receipt.fileId;
        this.logger.log(`The file ID is: ${fileId}`);
        return fileId.toString();
    }
    async updateFile(fileId, newContents) {
        const transaction = await new sdk_1.FileUpdateTransaction()
            .setFileId(sdk_1.FileId.fromString(fileId))
            .setContents(newContents)
            .setMaxTransactionFee(new sdk_1.Hbar(2))
            .freezeWith(this.client);
        const signTx = await transaction.sign(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
        const submitTx = await this.executeWithRetry(() => signTx.execute(this.client));
        await submitTx.getReceipt(this.client);
        this.logger.log(`The file ${fileId} was updated`);
    }
    async getFileContents(fileId) {
        const query = new sdk_1.FileContentsQuery().setFileId(sdk_1.FileId.fromString(fileId));
        const contents = await this.executeWithRetry(() => query.execute(this.client));
        return contents.toString();
    }
    async appendToFile(fileId, newContents) {
        const transaction = await new sdk_1.FileAppendTransaction()
            .setFileId(sdk_1.FileId.fromString(fileId))
            .setContents(newContents)
            .setMaxTransactionFee(new sdk_1.Hbar(2))
            .freezeWith(this.client);
        const signTx = await transaction.sign(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
        const submitTx = await this.executeWithRetry(() => signTx.execute(this.client));
        await submitTx.getReceipt(this.client);
        this.logger.log(`The file ${fileId} was appended`);
    }
    async createTopic(assetData) {
        const transaction = new sdk_1.TopicCreateTransaction()
            .setAdminKey(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
            .setSubmitKey(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
            .setTopicMemo(`Gemio Asset Topic - ${assetData.name} (${assetData.symbol}): Detailed asset information and updates`)
            .setMaxTransactionFee(new sdk_1.Hbar(1));
        const txResponse = await this.executeWithRetry(() => transaction.execute(this.client));
        const receipt = await txResponse.getReceipt(this.client);
        return receipt.topicId.toString();
    }
    async submitMessage(topicId, message) {
        const transaction = await new sdk_1.TopicMessageSubmitTransaction({ topicId, message, }).freezeWith(this.client);
        const signTx = await transaction.sign(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
        const txResponse = await this.executeWithRetry(() => signTx.execute(this.client));
        const receipt = await txResponse.getReceipt(this.client);
        return receipt.status.toString();
    }
    async getMessages(topicId, startTime, messageCount, timeout) {
        return new Promise((resolve, reject) => {
            let messages = [];
            const topicIdObj = sdk_1.TopicId.fromString(topicId);
            console.log(`Fetching past messages for topic ${topicId}`);
            const subscription = new sdk_1.TopicMessageQuery()
                .setTopicId(topicIdObj)
                .setStartTime(startTime)
                .subscribe(this.client, (error) => {
                console.error(error);
                subscription.unsubscribe();
                reject(error);
            }, (message) => {
                const buffer = buffer_1.Buffer.from(message.contents).toString("utf8");
                messages.push(JSON.parse(buffer).message);
                if (messages.length >= messageCount) {
                    subscription.unsubscribe();
                    resolve(messages);
                }
            });
            setTimeout(() => {
                subscription.unsubscribe();
                resolve(messages);
            }, timeout);
        });
    }
    executeWithRetry(operation) {
        return (0, rxjs_1.from)(operation()).pipe((0, operators_1.retry)({
            count: 3,
            delay: (error, retryCount) => {
                this.logger.log(`Retrying operation. Attempt ${retryCount}`);
                return (0, rxjs_1.timer)(1000 * retryCount);
            }
        })).toPromise();
    }
};
exports.HederaService = HederaService;
exports.HederaService = HederaService = HederaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], HederaService);
//# sourceMappingURL=hedera.service.js.map