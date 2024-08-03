import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HederaService } from './hedera.service';

describe('HederaService', () => {
  let service: HederaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        CacheModule.register(),
      ],
      providers: [HederaService],
    }).compile();

    service = module.get<HederaService>(HederaService);
    await service.onModuleInit(); // Inicializa o cliente e o tópico
  });

  afterEach(async () => {
    await service.onModuleDestroy(); // Fecha o cliente
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an account', async () => {
    const result = await service.createAccount();
    expect(result).toHaveProperty('accountId');
    expect(result).toHaveProperty('privateKey');
  });

  it('should get account balance', async () => {
    const accountId = '0.0.534848'; // Use um ID de conta válido para testes
    const balance = await service.getAccountBalance(accountId);
    expect(balance).toBeDefined();
  });

  it('should create NFT collection', async () => {
    const tokenId = await service.createNFTCollection('TestCollection', 'TEST');
    expect(tokenId).toBeDefined();
  });

  it('should mint NFT', async () => {
    const tokenId = await service.createNFTCollection('TestCollection', 'TEST');
    const serialNumber = await service.mintNFT(tokenId, 'Test Metadata');
    expect(serialNumber).toBeDefined();
  });

  it('should get NFT info', async () => {
    const tokenId = await service.createNFTCollection('TestCollection', 'TEST');
    const info = await service.getNFTInfo(tokenId);
    expect(info).toHaveProperty('name');
    expect(info).toHaveProperty('symbol');
    expect(info).toHaveProperty('totalSupply');
    expect(info).toHaveProperty('maxSupply');
  });

  it('should create and get file contents', async () => {
    const contents = 'Test file contents';
    const fileId = await service.createFile(contents);
    const retrievedContents = await service.getFileContents(fileId);
    expect(retrievedContents).toBe(contents);
  });

  it('should update file', async () => {
    const initialContents = 'Initial contents';
    const fileId = await service.createFile(initialContents);
    const newContents = 'Updated contents';
    await service.updateFile(fileId, newContents);
    const retrievedContents = await service.getFileContents(fileId);
    expect(retrievedContents).toBe(newContents);
  });

  it('should append to file', async () => {
    const initialContents = 'Initial contents';
    const fileId = await service.createFile(initialContents);
    const appendedContents = ' Appended contents';
    await service.appendToFile(fileId, appendedContents);
    const retrievedContents = await service.getFileContents(fileId);
    expect(retrievedContents).toBe(initialContents + appendedContents);
  });

  it('should submit message to topic', async () => {
    const message = 'Test message';
    const status = await service.submitMessage(message);
    expect(status).toBe('SUCCESS');
  });

  it('should get messages from topic', async () => {
    const message = 'Test message';
    await service.submitMessage(message);
    const startTime = new Date(Date.now() - 60000); // 1 minute ago
    const messages = await service.getMessages(startTime);
    expect(messages.length).toBeGreaterThan(0);
    expect(messages).toContain(message);
  });
});
