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
var HederaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sdk_1 = require("@hashgraph/sdk");
let HederaService = HederaService_1 = class HederaService {
    constructor(configService) {
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
    async getNFTsInCollection(collectionId, limit = 10, startAfter = 0) {
        const nfts = [];
        const tokenId = sdk_1.TokenId.fromString(collectionId);
        try {
            const tokenInfo = await new sdk_1.TokenInfoQuery()
                .setTokenId(tokenId)
                .execute(this.client);
            if (tokenInfo.tokenType.toString() !== 'NON_FUNGIBLE_UNIQUE') {
                this.logger.warn(`Token ${collectionId} is not an NFT collection.`);
                return nfts;
            }
            const totalSupply = tokenInfo.totalSupply.toNumber();
            const endIndex = Math.min(startAfter + limit, totalSupply);
            for (let i = startAfter + 1; i <= endIndex; i++) {
                try {
                    const nftId = new sdk_1.NftId(tokenId, i);
                    const nftInfo = await new sdk_1.TokenNftInfoQuery()
                        .setNftId(nftId)
                        .execute(this.client);
                    if (nftInfo && nftInfo.length > 0 && nftInfo[0].accountId) {
                        nfts.push({
                            id: collectionId,
                            serialNumber: i.toString(),
                            owner: nftInfo[0].accountId.toString(),
                            metadata: nftInfo[0].metadata
                                ? Buffer.from(nftInfo[0].metadata).toString('utf8')
                                : null,
                            creationTime: nftInfo[0].creationTime.toDate(),
                        });
                    }
                    else {
                        this.logger.warn(`NFT ${i} in collection ${collectionId} has unexpected structure or is burned.`);
                    }
                }
                catch (nftError) {
                    this.logger.error(`Error fetching NFT ${i} from collection ${collectionId}:`, nftError);
                }
            }
        }
        catch (error) {
            this.logger.error(`Error fetching NFTs for collection ${collectionId}:`, error);
        }
        return nfts;
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
    async mintNFT(collectionId, metadata) {
        try {
            const imageUrl = 'assets/icon/gemio_nft.jpeg';
            const enhancedMetadata = Object.assign(Object.assign({}, metadata), { image: imageUrl });
            console.log('Minting NFT with metadata:', enhancedMetadata, 'for collection:', collectionId);
            const supplyKey = sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));
            const fileId = await this.createImmutableFile(enhancedMetadata);
            const mintTx = await new sdk_1.TokenMintTransaction()
                .setTokenId(collectionId)
                .setMetadata([Buffer.from(fileId.toString())])
                .freezeWith(this.client);
            const mintTxSign = await mintTx.sign(supplyKey);
            const mintTxSubmit = await this.executeWithRetry(() => mintTxSign.execute(this.client));
            const mintRx = await mintTxSubmit.getReceipt(this.client);
            const serialNumber = mintRx.serials[0].low.toString();
            this.logger.log(`NFT criado ${collectionId} com serial: ${serialNumber}, referenciando arquivo: ${fileId}`);
            return serialNumber;
        }
        catch (error) {
            this.logger.error(`Erro ao criar NFT ${collectionId}:`, error);
            throw error;
        }
    }
    async createImmutableFile(content) {
        const fileCreateTx = new sdk_1.FileCreateTransaction()
            .setKeys([])
            .setContents(JSON.stringify(content))
            .setMaxTransactionFee(1)
            .freezeWith(this.client);
        const signedTx = await fileCreateTx.sign(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
        const submitTx = await signedTx.execute(this.client);
        const receipt = await submitTx.getReceipt(this.client);
        return receipt.fileId.toString();
    }
    async getFileContents(fileId) {
        const query = new sdk_1.FileContentsQuery()
            .setFileId(fileId);
        const contents = await query.execute(this.client);
        return JSON.parse(contents.toString());
    }
    async getCollectionInfo(tokenId) {
        try {
            const query = new sdk_1.TokenInfoQuery().setTokenId(sdk_1.TokenId.fromString(tokenId));
            const tokenInfo = await this.executeWithRetry(() => query.execute(this.client));
            return {
                tokenId: tokenId,
                name: tokenInfo.name,
                symbol: tokenInfo.symbol,
                totalSupply: tokenInfo.totalSupply.toString(),
                maxSupply: tokenInfo.maxSupply.toString(),
            };
        }
        catch (error) {
            console.error(`Error fetching collection info for token ${tokenId}:`, error);
            throw error;
        }
    }
    async getNFTInfo(tokenId, serialNumber) {
        try {
            const nftId = new sdk_1.NftId(sdk_1.TokenId.fromString(tokenId), serialNumber);
            const nftInfo = await new sdk_1.TokenNftInfoQuery()
                .setNftId(nftId)
                .execute(this.client);
            if (nftInfo.length === 0) {
                throw new Error('NFT not found');
            }
            return {
                tokenId: nftInfo[0].nftId.tokenId.toString(),
                serialNumber: nftInfo[0].nftId.serial.toString(),
                owner: nftInfo[0].accountId.toString(),
                metadata: nftInfo[0].metadata,
                creationTime: nftInfo[0].creationTime.toDate(),
            };
        }
        catch (error) {
            console.error(`Error fetching NFT info for token ${tokenId} and serial ${serialNumber}:`, error);
            throw error;
        }
    }
    async createTopic(assetData) {
        const transaction = new sdk_1.TopicCreateTransaction()
            .setAdminKey(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
            .setSubmitKey(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
            .setTopicMemo("Gemio Asset Events Log")
            .setTopicMemo(`Gemio Asset Topic - ${assetData.name} (${assetData.symbol}): Detailed asset information and updates`)
            .setMaxTransactionFee(new sdk_1.Hbar(1));
        const txResponse = await this.executeWithRetry(() => transaction.execute(this.client));
        const receipt = await txResponse.getReceipt(this.client);
        return receipt.topicId.toString();
    }
    async submitMessage(topicId, message) {
        try {
            const transaction = await new sdk_1.TopicMessageSubmitTransaction({ topicId, message, }).freezeWith(this.client);
            const signTx = await transaction.sign(sdk_1.PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
            const txResponse = await this.executeWithRetry(() => signTx.execute(this.client));
            const receipt = await txResponse.getReceipt(this.client);
            return receipt.status.toString();
        }
        catch (error) {
            this.logger.error(`Error submitting message to topic ${topicId}:`, error);
            throw error;
        }
    }
    async getMessages(topicId, startTime, messageCount, timeout) {
        return new Promise((resolve, reject) => {
            const messages = [];
            const topicIdObj = sdk_1.TopicId.fromString(topicId);
            console.log(`Fetching messages for topic ${topicId}`);
            const subscription = new sdk_1.TopicMessageQuery()
                .setTopicId(topicIdObj)
                .setStartTime(startTime)
                .subscribe(this.client, (error) => {
                if (error) {
                    console.error(`Subscription error: ${error}`);
                    subscription.unsubscribe();
                }
            }, (message) => {
                try {
                    const buffer = Buffer.from(message.contents).toString("utf8");
                    const parsedMessage = JSON.parse(buffer);
                    messages.push({
                        message: parsedMessage.message,
                        timestamp: message.consensusTimestamp.toDate()
                    });
                    if (messages.length >= messageCount) {
                        subscription.unsubscribe();
                        resolve(messages);
                    }
                }
                catch (parseError) {
                    console.error(`Error parsing message: ${parseError}`);
                }
            });
            setTimeout(() => {
                subscription.unsubscribe();
                resolve(messages);
            }, timeout);
        });
    }
    async executeWithRetry(operation, maxRetries = 3, delay = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
};
exports.HederaService = HederaService;
exports.HederaService = HederaService = HederaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HederaService);
//# sourceMappingURL=hedera.service.js.map