import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { HederaService } from '../hedera/hedera.service';

describe('AssetService', () => {
  let service: AssetService;
  let hederaService: HederaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: HederaService,
          useValue: {
            createNFTCollection: jest.fn().mockResolvedValue('mockedTokenId'),
            mintNFT: jest.fn().mockResolvedValue('mockedSerialNumber'),
            createFile: jest.fn().mockResolvedValue('mockedFileId'),
            appendToFile: jest.fn().mockResolvedValue(undefined),
            getFileContents: jest.fn().mockResolvedValue('{"version":1,"data":{}}'),
            submitMessage: jest.fn().mockResolvedValue('success'),
          },
        },
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
    hederaService = module.get<HederaService>(HederaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an asset', async () => {
    const createAssetDto: any = {
      name: 'Test Asset',
      type: 'TestType',
      manufacturer: 'TestManufacturer',
      model: 'TestModel',
      serialNumber: '123456',
      manufactureDate: new Date(),
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 'operational',
      location: { latitude: 0, longitude: 0 },
      specifications: {},
      currentPerformance: {},
    };

    const asset = await service.createAsset(createAssetDto);
    expect(asset).toBeDefined();
    expect(asset.id).toBeDefined();
    expect(asset.tokenId).toBe('mockedTokenId');
    expect(asset.metadataFileId).toBe('mockedFileId');
  });

  it('should get an asset by id', async () => {
    const mockAsset: any = {
      id: 'mockId',
      name: 'Test Asset',
      metadataFileId: 'mockedFileId',
    };
    service['assets'] = [mockAsset];

    const asset = await service.getAssetById('mockId');
    expect(asset).toBeDefined();
    expect(asset.name).toBe('Test Asset');
  });

  it('should update an asset', async () => {
    const mockAsset: any = {
      id: 'mockId',
      name: 'Test Asset',
      metadataFileId: 'mockedFileId',
    };
    service['assets'] = [mockAsset];

    const updateAssetDto = { name: 'Updated Asset' };
    const updatedAsset = await service.updateAsset('mockId', updateAssetDto);
    expect(updatedAsset.name).toBe('Updated Asset');
    expect(hederaService.appendToFile).toHaveBeenCalled();
  });
});
