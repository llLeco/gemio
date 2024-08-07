import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { retry } from 'rxjs/operators';
import { from, timer } from 'rxjs';
import {
  Client,
  AccountId,
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
  AccountBalanceQuery,
  TransferTransaction,
  AccountInfoQuery,
  TokenInfoQuery,
  TokenMintTransaction,
  TokenSupplyType,
  TokenCreateTransaction,
  TokenType,
  FileContentsQuery,
  FileCreateTransaction,
  FileId,
  FileUpdateTransaction,
  FileAppendTransaction,
  TopicMessageQuery,
  TopicId,
  TopicMessageSubmitTransaction,
  TopicCreateTransaction,
  Timestamp,
  TokenId,
  TokenNftInfoQuery,
  NftId,
} from "@hashgraph/sdk";

@Injectable()
export class HederaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HederaService.name);
  private client: Client;
  private network: string;
  private topicId: TopicId;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) { }

  async onModuleInit() {
    await this.initializeClient();
    // await this.initializeTopic();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
    }
  }

  private async initializeClient() {
    const myAccountId = AccountId.fromString(this.configService.get('HEDERA_ACCOUNT_ID'));
    const myPrivateKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

    if (this.configService.get('HEDERA_NETWORK') !== 'mainnet') {
      this.client = Client.forTestnet();
      this.logger.log('Initialized Hedera client for testnet');
    } else {
      this.client = Client.forMainnet();
      this.logger.log('Initialized Hedera client for mainnet');
    }

    this.client.setOperator(myAccountId, myPrivateKey);

    this.logger.log(`Hedera client operator set to account: ${myAccountId.toString()}`);
    if (!this.client) {
      throw new Error('Hedera client was not initialized properly');
    }
  }

  getClient(): Client {
    return this.client;
  }

  async createAccount(): Promise<{ accountId: string; privateKey: string }> {
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    const newAccount = await this.executeWithRetry(() =>
      new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(this.client)
    );

    const getReceipt = await newAccount.getReceipt(this.client);
    const newAccountId = getReceipt.accountId;

    return {
      accountId: newAccountId.toString(),
      privateKey: newAccountPrivateKey.toString(),
    };
  }

  async getAccountBalance(accountId: string): Promise<string> {
    const balance = await this.executeWithRetry(() =>
      new AccountBalanceQuery()
        .setAccountId(AccountId.fromString(accountId))
        .execute(this.client)
    );

    return balance.hbars.toString();
  }

  async getCollectionsForAccount(accountId: string): Promise<string[]> {
    const collections: string[] = [];
    const account = AccountId.fromString(accountId);

    try {
      const accountInfo: any = await new AccountInfoQuery()
        .setAccountId(account)
        .execute(this.client);

      const tokenRelationships = accountInfo.tokenRelationships;

      for (const [tokenIdStr, relationship] of tokenRelationships._map.entries()) {
        const tokenId = TokenId.fromString(tokenIdStr);
        const tokenInfo = await new TokenInfoQuery()
          .setTokenId(tokenId)
          .execute(this.client);

        if (tokenInfo.tokenType.toString() === 'NON_FUNGIBLE_UNIQUE') {
          collections.push(tokenIdStr);
        }
      }
    } catch (error) {
      this.logger.error(`Error fetching collections for account ${accountId}:`, error);
    }

    return collections;
  }

  async getNFTsInCollection(collectionId: string): Promise<any[]> {
    const nfts: any[] = [];
    const tokenId = TokenId.fromString(collectionId);

    try {
      const tokenInfo = await new TokenInfoQuery()
        .setTokenId(tokenId)
        .execute(this.client);

      if (tokenInfo.tokenType.toString() !== 'NON_FUNGIBLE_UNIQUE') {
        this.logger.warn(`Token ${collectionId} is not an NFT collection.`);
        return nfts;
      }

      const totalSupply = tokenInfo.totalSupply.toNumber();

      for (let i = 1; i <= totalSupply; i++) {
        try {
          const nftId = new NftId(tokenId, i);
          const nftInfo = await new TokenNftInfoQuery()
            .setNftId(nftId)
            .execute(this.client);

          // this.logger.debug(`NFT ${i} info:`, JSON.stringify(nftInfo, null, 2));

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
          } else {
            this.logger.warn(`NFT ${i} in collection ${collectionId} has unexpected structure or is burned.`);
          }
        } catch (nftError) {
          this.logger.error(`Error fetching NFT ${i} from collection ${collectionId}:`, nftError);
        }
      }
    } catch (error) {
      this.logger.error(`Error fetching NFTs for collection ${collectionId}:`, error);
    }

    return nfts;
  }

  async transferHbar(from: string, to: string, amount: number): Promise<string> {
    const transferTransaction = await this.executeWithRetry(() =>
      new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(from), Hbar.fromTinybars(-amount))
        .addHbarTransfer(AccountId.fromString(to), Hbar.fromTinybars(amount))
        .execute(this.client)
    );

    const transactionReceipt = await transferTransaction.getReceipt(this.client);
    return transactionReceipt.status.toString();
  }

  // async testConnection(): Promise<{ networkName: string; accountId: string }> {
  //   try {
  //     const accountId = this.client.operatorAccountId;
  //     const query = new AccountInfoQuery().setAccountId(accountId);
  //     const accountInfo = await this.executeWithRetry(() => query.execute(this.client));

  //     return {
  //       networkName: this.network,
  //       accountId: accountInfo.accountId.toString(),
  //     };
  //   } catch (error) {
  //     throw new Error(`Falha na conexão com a Hedera: ${error.message}`);
  //   }
  // }

  async createNFTCollection(name: string, symbol: string): Promise<string> {
    // const cacheKey = `nftCollection:${name}:${symbol}`;
    // const cachedTokenId = await this.cacheManager.get<string>(cacheKey);
    // if (cachedTokenId) {
    //   return cachedTokenId;
    // }

    const treasuryAccountId = AccountId.fromString(this.configService.get('HEDERA_ACCOUNT_ID'));
    const treasuryKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

    const nftCreate = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(treasuryAccountId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(250)
      .setSupplyKey(treasuryKey)
      .freezeWith(this.client);

    const nftCreateTxSign = await nftCreate.sign(treasuryKey);
    const nftCreateSubmit = await this.executeWithRetry(() => nftCreateTxSign.execute(this.client));
    const nftCreateRx = await nftCreateSubmit.getReceipt(this.client);
    const tokenId = nftCreateRx.tokenId;

    this.logger.log(`Created NFT with Token ID: ${tokenId}`);

    // await this.cacheManager.set(cacheKey, tokenId.toString(), 0);
    return tokenId.toString();
  }

  async mintNFT(tokenId: string, metadata: any): Promise<string> {
    const supplyKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(metadata)])
      .freezeWith(this.client);

    const mintTxSign = await mintTx.sign(supplyKey);
    const mintTxSubmit = await this.executeWithRetry(() => mintTxSign.execute(this.client));
    const mintRx = await mintTxSubmit.getReceipt(this.client);

    this.logger.log(`Created NFT ${tokenId} with serial: ${mintRx.serials[0].low}`);

    return mintRx.serials[0].low.toString();
  }

  async getNFTInfo(tokenId: string): Promise<any> {
    const cacheKey = `nftInfo:${tokenId}`;
    const cachedInfo = await this.cacheManager.get(cacheKey);
    if (cachedInfo) {
      return cachedInfo;
    }

    const query = new TokenInfoQuery().setTokenId(tokenId);
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

  // async createFile(contents: string): Promise<string> {
  //   const transaction = new FileCreateTransaction()
  //     .setKeys([PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'))])
  //     .setContents(contents)
  //     .setMaxTransactionFee(new Hbar(2))
  //     .freezeWith(this.client);

  //   const signTx = await transaction.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
  //   const submitTx = await this.executeWithRetry(() => signTx.execute(this.client));
  //   const receipt = await submitTx.getReceipt(this.client);
  //   const fileId = receipt.fileId;

  //   this.logger.log(`The file ID is: ${fileId}`);
  //   return fileId.toString();
  // }

  // async updateFile(fileId: string, newContents: string): Promise<void> {
  //   const transaction = await new FileUpdateTransaction()
  //     .setFileId(FileId.fromString(fileId))
  //     .setContents(newContents)
  //     .setMaxTransactionFee(new Hbar(2))
  //     .freezeWith(this.client);

  //   const signTx = await transaction.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
  //   const submitTx = await this.executeWithRetry(() => signTx.execute(this.client));
  //   await submitTx.getReceipt(this.client);

  //   this.logger.log(`The file ${fileId} was updated`);
  // }

  // async getFileContents(fileId: string): Promise<string> {
  //   const query = new FileContentsQuery().setFileId(FileId.fromString(fileId));
  //   const contents = await this.executeWithRetry(() => query.execute(this.client));
  //   return contents.toString();
  // }

  // async appendToFile(fileId: string, newContents: string): Promise<void> {
  //   const transaction = await new FileAppendTransaction()
  //     .setFileId(FileId.fromString(fileId))
  //     .setContents(newContents)
  //     .setMaxTransactionFee(new Hbar(2))
  //     .freezeWith(this.client);

  //   const signTx = await transaction.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
  //   const submitTx = await this.executeWithRetry(() => signTx.execute(this.client));
  //   await submitTx.getReceipt(this.client);

  //   this.logger.log(`The file ${fileId} was appended`);
  // }

  // async initializeTopic() {
  //   const cachedTopicId = await this.cacheManager.get<string>('hederaTopicId');
  //   if (cachedTopicId) {
  //     this.topicId = TopicId.fromString(cachedTopicId);
  //     return;
  //   }

  //   if (this.configService.get('HEDERA_TOPIC_ID')) {
  //     this.topicId = TopicId.fromString(this.configService.get('HEDERA_TOPIC_ID'));
  //   } else {
  //     this.topicId = await this.createTopic();
  //     this.logger.log(`New topic created: ${this.topicId}`);
  //   }

  //   await this.cacheManager.set('hederaTopicId', this.topicId.toString(), 0);
  // }

  async createTopic(assetData: any): Promise<string> {
    const transaction = new TopicCreateTransaction()
      .setAdminKey(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
      .setSubmitKey(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')))
      .setTopicMemo("Gemio Asset Events Log")
      .setTopicMemo(`Gemio Asset Topic - ${assetData.name} (${assetData.symbol}): Detailed asset information and updates`)
      .setMaxTransactionFee(new Hbar(1));

    const txResponse = await this.executeWithRetry(() => transaction.execute(this.client));
    const receipt = await txResponse.getReceipt(this.client);
    return receipt.topicId.toString();
  }

  async submitMessage(topicId: string, message: string): Promise<string> {
    const transaction = await new TopicMessageSubmitTransaction({ topicId, message, }).freezeWith(this.client);

    const signTx = await transaction.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
    const txResponse = await this.executeWithRetry(() => signTx.execute(this.client));
    const receipt = await txResponse.getReceipt(this.client);

    return receipt.status.toString();
  }

  async getMessages(topicId, startTime, messageCount, timeout) {
    return new Promise((resolve, reject) => {
      let messages = [];

      const topicIdObj = TopicId.fromString(topicId);
      console.log(`Fetching past messages for topic ${topicId}`);

      const subscription = new TopicMessageQuery()
        .setTopicId(topicIdObj)
        .setStartTime(startTime)
        .subscribe(this.client,
          (error) => {
            console.error(error);
            subscription.unsubscribe();
            reject(error);
          },
          (message) => {
            const buffer = Buffer.from(message.contents).toString("utf8");
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

  private executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
    return from(operation()).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => {
          this.logger.log(`Retrying operation. Attempt ${retryCount}`);
          return timer(1000 * retryCount);
        }
      })
    ).toPromise();
  }
}
