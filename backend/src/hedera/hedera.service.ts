import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  TopicMessageQuery,
  TopicId,
  TopicMessageSubmitTransaction,
  TopicCreateTransaction,
  TokenId,
  TokenNftInfoQuery,
  NftId,
} from "@hashgraph/sdk";

@Injectable()
export class HederaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HederaService.name);
  private client: Client;

  constructor(
    private configService: ConfigService
  ) { }

  async onModuleInit() {
    await this.initializeClient();
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

  async getNFTsInCollection(collectionId: string, limit: number = 10, startAfter: number = 0): Promise<any[]> {
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
      const endIndex = Math.min(startAfter + limit, totalSupply);

      for (let i = startAfter + 1; i <= endIndex; i++) {
        try {
          const nftId = new NftId(tokenId, i);
          const nftInfo = await new TokenNftInfoQuery()
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

  async createNFTCollection(name: string, symbol: string): Promise<string> {
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

    return tokenId.toString();
  }

  async mintNFT(collectionId: string, metadata: any): Promise<string> {
    try {
      const supplyKey = PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY'));

      // Cria um arquivo imutável com os metadados
      const fileId = await this.createImmutableFile(metadata);

      const mintTx = await new TokenMintTransaction()
        .setTokenId(collectionId)
        .setMetadata([Buffer.from(fileId.toString())])
        .freezeWith(this.client);

      const mintTxSign = await mintTx.sign(supplyKey);
      const mintTxSubmit = await this.executeWithRetry(() => mintTxSign.execute(this.client));
      const mintRx = await mintTxSubmit.getReceipt(this.client);

      const serialNumber = mintRx.serials[0].low.toString();
      this.logger.log(`NFT criado ${collectionId} com serial: ${serialNumber}, referenciando arquivo: ${fileId}`);

      return serialNumber;
    } catch (error) {
      this.logger.error(`Erro ao criar NFT ${collectionId}:`, error);
      throw error;
    }
  }

  private async createImmutableFile(content: any): Promise<string> {
    const fileCreateTx = new FileCreateTransaction()
      .setKeys([]) // Sem chaves significa que o arquivo é imutável
      .setContents(JSON.stringify(content))
      .setMaxTransactionFee(1)
      .freezeWith(this.client);

    const signedTx = await fileCreateTx.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
    const submitTx = await signedTx.execute(this.client);
    const receipt = await submitTx.getReceipt(this.client);

    return receipt.fileId!.toString();
  }

  async getFileContents(fileId: string): Promise<any> {
    const query = new FileContentsQuery()
      .setFileId(fileId);

    const contents = await query.execute(this.client);
    return JSON.parse(contents.toString());
  }

  async getNFTInfo(tokenId: string): Promise<any> {
    const query = new TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await this.executeWithRetry(() => query.execute(this.client));

    const info = {
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      totalSupply: tokenInfo.totalSupply.toString(),
      maxSupply: tokenInfo.maxSupply.toString(),
    };

    return info;
  }

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
    try {
      const transaction = await new TopicMessageSubmitTransaction({ topicId, message, }).freezeWith(this.client);

      const signTx = await transaction.sign(PrivateKey.fromString(this.configService.get('HEDERA_PRIVATE_KEY')));
      const txResponse = await this.executeWithRetry(() => signTx.execute(this.client));
      const receipt = await txResponse.getReceipt(this.client);

      return receipt.status.toString();
    } catch (error) {
      this.logger.error(`Error submitting message to topic ${topicId}:`, error);
      throw error;
    }
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

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        this.logger.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw lastError;
  }
}
