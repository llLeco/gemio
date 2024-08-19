# vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/src/main.ts",
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    }
  ]
}

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "typeRoots": [ "node_modules/@types" ],
  }
}

```

# tsconfig.build.json

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

```

# package.json

```json
{
  "name": "gemio-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/class-transformer": "^0.4.0",
    "@nestjs/cli": "8.2.6",
    "@nestjs/config": "^3.2.3",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^9.0.0",
    "@nestjs/schematics": "8.0.11",
    "axios": "^1.7.3",
    "bcrypt": "^5.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.2.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.2.6",
    "@nestjs/schematics": "^8.0.11",
    "@nestjs/testing": "^9.4.3",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.13",
    "@types/jest": "^29.5.1",
    "@types/node": "18.16.12",
    "@types/passport-jwt": "^4.0.1",
    "@types/passport-local": "^1.0.38",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^29.5.0",
    "prettier": "^2.3.2",
    "source-map-support": "^0.5.20",
    "supertest": "^6.1.3",
    "ts-jest": "29.1.0",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "4.2.0",
    "typescript": "^5.0.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

```

# nest-cli.json

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}

```

# create-test-assets.js

```js
const axios = require('axios');

const API_URL = 'http://localhost:3000/assets';

const testAssets = [
  {
    name: 'Industrial Pump A1',
    type: 'Pump',
    manufacturer: 'PumpCo',
    model: 'SuperPump 3000',
    serialNumber: 'SP3K-001',
    manufactureDate: new Date('2022-01-15').toISOString(),
    lastMaintenanceDate: new Date('2023-05-01').toISOString(),
    nextMaintenanceDate: new Date('2023-11-01').toISOString(),
    status: 'operational',
    location: { latitude: 40.7128, longitude: -74.0060 },
    specifications: { capacity: '500 l/min', power: '7.5 kW' },
    currentPerformance: { efficiency: 95, vibration: 0.15 }
  },
  {
    name: 'CNC Machine B2',
    type: 'CNC',
    manufacturer: 'MachineTech',
    model: 'PreciseCut X',
    serialNumber: 'PCX-002',
    manufactureDate: new Date('2021-11-30').toISOString(),
    lastMaintenanceDate: new Date('2023-04-15').toISOString(),
    nextMaintenanceDate: new Date('2023-10-15').toISOString(),
    status: 'maintenance',
    location: { latitude: 34.0522, longitude: -118.2437 },
    specifications: { axes: '5-axis', workArea: '1000x800x600 mm' },
    currentPerformance: { accuracy: 0.01, uptime: 92 }
  },
  {
    name: 'HVAC System C3',
    type: 'HVAC',
    manufacturer: 'CoolAir Inc.',
    model: 'EcoControl 500',
    serialNumber: 'EC500-003',
    manufactureDate: new Date('2023-02-28').toISOString(),
    lastMaintenanceDate: new Date('2023-06-01').toISOString(),
    nextMaintenanceDate: new Date('2023-12-01').toISOString(),
    status: 'operational',
    location: { latitude: 51.5074, longitude: -0.1278 },
    specifications: { capacity: '50 tons', energyRating: 'A+++' },
    currentPerformance: { efficiency: 98, energyConsumption: 45 }
  }
];

async function createTestAssets() {
  for (const asset of testAssets) {
    try {
      const response = await axios.post(API_URL, asset);
      console.log(`Created asset: ${response.data.name} with ID: ${response.data.id}`);
    } catch (error) {
      console.error(`Error creating asset ${asset.name}:`, error.response ? error.response.data : error.message);
    }
  }
}

createTestAssets();

```

# README.md

```md
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

\`\`\`bash
$ npm install
\`\`\`

## Running the app

\`\`\`bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
\`\`\`

## Test

\`\`\`bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
\`\`\`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```

# .prettierrc

```
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

# .gitignore

```
# compiled output
/dist
/node_modules

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
```

# .eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

```

# test/jest-e2e.json

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}

```

# test/app.e2e-spec.ts

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

```

# src/main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/static', express.static(join(__dirname, '..', 'public')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

```

# src/app.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```

# src/app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/asset.module';
import { UsersModule } from './users/users.module';
import { HederaModule } from './hedera/hedera.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CollectionModule } from './collections/collection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AssetsModule,
    HederaModule,
    AuthModule,
    UsersModule,
    CacheModule.register(),
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

# src/app.controller.ts

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```

# src/users/users.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly users: any[];

  constructor(private configService: ConfigService) {
    this.users = [
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'leco',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'creator',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'owner',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'mainainer',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },

    ];
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }
}

```

# src/users/users.module.ts

```ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

```

# src/users/user.model.ts

```ts
export class User {
  hederaAccountId: string;
  username: string;
  password: string;
}

```

# src/models/create-asset.dto.ts

```ts
import { IsString, IsDate, IsNumber, IsBoolean, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class SensorAttributeDto {
  @IsString()
  sensor_type_id: string;

  @IsString()
  name: string;

  @IsString()
  vendor_code: string;

  @IsDate()
  start_time: Date;

  @IsBoolean()
  has_temperature_monitor_1: boolean;

  @IsNumber()
  @IsOptional()
  temperature_monitor_value_1?: number;

  @IsNumber()
  @IsOptional()
  warning_temperature_monitor_1?: number;

  @IsString()
  @IsOptional()
  temperature_monitor_name_1?: string;

  @IsBoolean()
  has_geofence: boolean;

  @IsNumber()
  @IsOptional()
  geofence_distance?: number;
}

class MachineModuleAttributeDto {
  @IsString()
  serial_number: string;

  @IsString()
  manufacturer: string;

  @IsString()
  machine_module_model: string;

  @IsString()
  @IsOptional()
  machine_module_type_id?: string;

  @IsString()
  module_type_machine: string;

  @IsString()
  @IsOptional()
  obs?: string;
}

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  machine_type: string;

  @IsString()
  serial_number: string;

  @IsString()
  manufacturer: string;

  @IsString()
  model: string;

  @IsNumber()
  manufacture_year: number;

  @IsString()
  customer_id: string;

  @IsString()
  site_id: string;

  @IsString()
  project_id: string;

  @IsDate()
  acquisition_date: Date;

  @IsDate()
  purchase_date: Date;

  @IsDate()
  installation_date: Date;

  @IsNumber()
  warranty_in_months: number;

  @IsDate()
  warranty_start_date: Date;

  @IsString()
  owner: string;

  @IsString()
  cost_center: string;

  @IsString()
  account: string;

  @IsNumber()
  price: number;

  @IsString()
  criticality: '1' | '2' | '3';

  @IsDate()
  initial_reading_date: Date;

  @IsDate()
  last_reading_date: Date;

  @IsNumber()
  load_working_time: number;

  @IsNumber()
  working_time: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SensorAttributeDto)
  sensors_attributes: SensorAttributeDto[];

  @IsBoolean()
  has_virtual_sensor: boolean;

  @IsString()
  @IsOptional()
  virtual_sensor_name?: string;

  @IsNumber()
  @IsOptional()
  virtual_sensor_daily_hours?: number;

  @IsNumber()
  @IsOptional()
  virtual_sensor_days_in_week?: number;

  @IsString()
  @IsOptional()
  obs?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MachineModuleAttributeDto)
  machine_modules_attributes: MachineModuleAttributeDto[];

  @IsString()
  collectionId: string;
}

```

# src/models/collection.model.ts

```ts
export class Collection {
  id: string;
  name: string;
  symbol: string;
  description: string;
  createdAt: Date;

  constructor(partial: Partial<Collection>) {
    Object.assign(this, partial);
  }
}

```

# src/models/asset.model.ts

```ts
export class Asset {
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  manufactureDate: Date;

  collectionId: string;
  id: string;
  topicId: string;

  constructor(partial: Partial<Asset>) {
    Object.assign(this, partial);
  }
}

```

# src/hedera/hedera.service.ts

```ts
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
      console.log('Minting NFT with metadata:', metadata, 'for collection:', collectionId);
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

  async getCollectionInfo(tokenId: string): Promise<any> {
    try {
      const query = new TokenInfoQuery().setTokenId(TokenId.fromString(tokenId));
      const tokenInfo = await this.executeWithRetry(() => query.execute(this.client));

      return {
        tokenId: tokenId,
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        totalSupply: tokenInfo.totalSupply.toString(),
        maxSupply: tokenInfo.maxSupply.toString(),
      };
    } catch (error) {
      console.error(`Error fetching collection info for token ${tokenId}:`, error);
      throw error;
    }
  }

  async getNFTInfo(tokenId: string, serialNumber: string): Promise<any> {
    try {
      const nftId = new NftId(TokenId.fromString(tokenId), serialNumber);
      const nftInfo = await new TokenNftInfoQuery()
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
    } catch (error) {
      console.error(`Error fetching NFT info for token ${tokenId} and serial ${serialNumber}:`, error);
      throw error;
    }
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

```

# src/hedera/hedera.module.ts

```ts
import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HederaService } from './hedera.service';
import { HederaController } from './hedera.controller';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule,
  ],
  providers: [HederaService],
  controllers: [HederaController],
  exports: [HederaService],
})
export class HederaModule {}

```

# src/hedera/hedera.controller.ts

```ts
import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { HederaService } from './hedera.service';

@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) {}

  @Post('account')
  async createAccount() {
    return this.hederaService.createAccount();
  }

  @Get('balance/:accountId')
  async getBalance(@Param('accountId') accountId: string) {
    return this.hederaService.getAccountBalance(accountId);
  }

  @Post('transfer')
  async transferHbar(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('amount') amount: number,
  ) {
    return this.hederaService.transferHbar(from, to, amount);
  }

  @Post('nft/collection')
  async createNFTCollection(@Body() body: { name: string; symbol: string }) {
    return this.hederaService.createNFTCollection(body.name, body.symbol);
  }

  @Post('nft/mint')
  async mintNFT(@Body() body: { tokenId: string; metadata: string }) {
    return this.hederaService.mintNFT(body.tokenId, body.metadata);
  }

  @Get('colleciton/:id')
  async getCollectionInfo(@Param('id') tokenId: string) {
    return this.hederaService.getCollectionInfo(tokenId);
  }

  @Get('messages')
  async getMessages( @Query('topicId') topicId: string, @Query('startTime') startTime: string ): Promise<any> {
    return this.hederaService.getMessages(topicId, new Date(startTime), 10, 1000);
  }
}

```

# src/collections/collection.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';

@Injectable()
export class CollectionService {
  constructor(private readonly hederaService: HederaService) {}

  async createCollection(name: string, symbol: string, description: string): Promise<Collection> {
    const tokenId = await this.hederaService.createNFTCollection(name, symbol);
    return new Collection({
      id: tokenId,
      name,
      symbol,
      description,
      createdAt: new Date()
    });
  }

  async getCollection(collectionId: string): Promise<Collection> {
    const info = await this.hederaService.getCollectionInfo(collectionId);
    return new Collection({
      id: collectionId,
      name: info.name,
      symbol: info.symbol,
      description: 'Description not available', // Hedera não fornece descrição no TokenInfo
      createdAt: new Date() // Hedera não fornece a data de criação, então usamos a data atual
    });
  }

  async getCollectionsAndNFTs(hederaAccountId) {
    console.log('hederaAccountId', hederaAccountId);
    const collectionIds = await this.hederaService.getCollectionsForAccount(hederaAccountId);
    const collections = await Promise.all(collectionIds.map(id => this.getCollection(id)));
    const nfts = await Promise.all(collectionIds.map(async (collectionId) => {
        const nftsInCollection = await this.hederaService.getNFTsInCollection(collectionId);
        return nftsInCollection.map(nft => new Asset(Object.assign(Object.assign({}, nft), { id: `${collectionId}:${nft.serialNumber}`, tokenId: collectionId })));
    }));
    return {
        collections,
        nfts: nfts.flat()
    };
}

  async getAssetsInCollection(collectionId: string): Promise<any> {
    try {
      const nfts = await this.hederaService.getNFTsInCollection(collectionId);
      return nfts;
    } catch (error) {
      console.error('Error fetching assets', error);
      throw error;
    }
  }
}

```

# src/collections/collection.module.ts

```ts
import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { HederaModule } from '../hedera/hedera.module';

@Module({
  imports: [HederaModule],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService]
})
export class CollectionModule {}

```

# src/collections/collection.controller.ts

```ts
import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private configService: ConfigService
  ) {}

  @Post()
  async createCollection(@Body() collectionData: { name: string; symbol: string; description: string }): Promise<Collection> {
    return this.collectionService.createCollection(collectionData.name, collectionData.symbol, collectionData.description);
  }

  @Get()
  async getAllCollections(): Promise<any> {
    return this.collectionService.getCollectionsAndNFTs(this.configService.get('HEDERA_ACCOUNT_ID'));
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionService.getCollection(id);
  }

  @Get(':id/assets')
  async getAssetsInCollection(@Param('id') collectionId: string): Promise<Asset[]> {
    return this.collectionService.getAssetsInCollection(collectionId);
  }
}

```

# src/auth/local.strategy.ts

```ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

```

# src/auth/jwt.strategy.ts

```ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '018515',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

```

# src/auth/jwt-auth.guard.ts

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

```

# src/auth/auth.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.hederaAccountId };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      hederaAccountId: user.hederaAccountId,
    };
  }
}

```

# src/auth/auth.module.ts

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

```

# src/auth/auth.controller.ts

```ts
import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // get server status response
  @Get('status')
  async status() {
    return { status: 'ok' };
  }
}

```

# src/assets/asset.service.ts

```ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Asset } from '../models/asset.model';
import { CreateAssetDto } from '../models/create-asset.dto';

class AssetCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssetCreationError';
  }
}

class AssetEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssetEventError';
  }
}

@Injectable()
export class AssetService {
  private assets: Asset[] = [];

  constructor(private readonly hederaService: HederaService) {}

  async createAsset(collectionId: string, createAsset: CreateAssetDto): Promise<Asset> {
    try {
      // Ensure createAssetDto is not undefined
      if (!createAsset) {
        throw new BadRequestException('Asset data is required');
      }

      console.log('Creating asset', createAsset);

      // Create a topic for the asset
      const topicId = await this.hederaService.createTopic(createAsset);
      console.log('Topic ID:', topicId);

      // Prepare initial metadata
      const initialMetadata = {
        asset: createAsset,
        timestamp: new Date().toISOString(),
        topicId: topicId
      };

      // Mint NFT
      const serialNumber = await this.hederaService.mintNFT(collectionId, initialMetadata);

      // Create asset object
      const asset = new Asset({
        ...createAsset,
        id: `${collectionId}:${serialNumber}`,
        collectionId: collectionId,
        topicId: topicId,
      });

      return asset;
    } catch (error) {
      console.error('Error creating asset', error);
      throw new AssetCreationError(`Failed to create asset: ${error.message}`);
    }
  }

  async createAssetEvent(topicId: string, event: any): Promise<void> {
    try {
      await this.hederaService.submitMessage(topicId, JSON.stringify(event));
    } catch (error) {
      console.error('Error creating asset event', error);
      throw new AssetEventError(`Failed to create asset event: ${error.message}`);
    }
  }

  async getAssetEvents(assetId: string, startDate: Date): Promise<any> {
    try {
      const asset = this.assets.find((a) => a.id === assetId);
      if (!asset) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      const { topicId } = asset;
      const messages = await this.hederaService.getMessages(topicId, startDate, 10, 1000);
      return messages;
    } catch (error) {
      console.error(`Error fetching events for asset ID ${assetId}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch asset events: ${error.message}`);
    }
  }

  async getCollectionInfo(collectionId: string): Promise<any> {
    try {
      return await this.hederaService.getCollectionInfo(collectionId);
    } catch (error) {
      console.error(`Error fetching collection info for ID ${collectionId}`, error);
      throw new BadRequestException(`Failed to fetch collection info: ${error.message}`);
    }
  }

  async getIliotAsset(assetId: string): Promise<any> {
    try {
      const [collectionId, serialNumber] = assetId.split(':');

      if (!collectionId || !serialNumber) {
        throw new BadRequestException('Invalid asset ID format');
      }

      const nftInfo = await this.hederaService.getNFTInfo(collectionId, serialNumber);

      if (!nftInfo || !nftInfo.metadata) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      const fileId = Buffer.from(nftInfo.metadata).toString('utf8');

      if (!fileId) {
        throw new BadRequestException('Asset metadata file ID is invalid or missing');
      }

      const fileContents = await this.hederaService.getFileContents(fileId);

      if (!fileContents || !fileContents.asset) {
        throw new BadRequestException('Asset data is invalid or missing');
      }

      return fileContents.asset;
    } catch (error) {
      console.error(`Error fetching Iliot asset with ID ${assetId}`, error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch Iliot asset: ${error.message}`);
    }
  }

  async getTopicId(assetId: string): Promise<string> {
    try {
      const [collectionId, serialNumber] = assetId.split(':');

        if (!collectionId || !serialNumber) {
          throw new BadRequestException('Invalid asset ID format');
        }

        const nftInfo = await this.hederaService.getNFTInfo(collectionId, serialNumber);

        if (!nftInfo || !nftInfo.metadata) {
          throw new NotFoundException(`Asset with ID ${assetId} not found`);
        }

        const fileId = Buffer.from(nftInfo.metadata).toString('utf8');

        if (!fileId) {
          throw new BadRequestException('Asset metadata file ID is invalid or missing');
        }

        const fileContents = await this.hederaService.getFileContents(fileId);

        if (!fileContents || !fileContents.topicId) {
          throw new BadRequestException('Asset topic ID is invalid or missing');
        }

        return fileContents.topicId;
      } catch (error) {
        console.error(`Error fetching topic ID for asset with ID ${assetId}`, error);
        if (error instanceof BadRequestException || error instanceof NotFoundException) {
          throw error;
        }
        throw new BadRequestException(`Failed to fetch topic ID: ${error.message}`);
      }
    }
}

```

# src/assets/asset.module.ts

```ts
import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { HederaModule } from '../hedera/hedera.module';

@Module({
  imports: [HederaModule],
  providers: [AssetService],
  controllers: [AssetController],
  exports: [AssetService]
})
export class AssetsModule {}

```

# src/assets/asset.controller.ts

```ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
import { HederaService } from '../hedera/hedera.service';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly hederaService: HederaService
  ) {}

  @Post()
  async createAsset(@Body() createAsset: {collectionId: string, assetData: CreateAssetDto}) {
    return this.assetService.createAsset(createAsset.collectionId, createAsset.assetData);
  }

  @Post(':id/events')
  async createAssetEvent(@Param('id') id: string, @Body() event: any) {
    return this.assetService.createAssetEvent(id, event);
  }

  @Get(':id/events')
  async getAssetEvents(@Param('id') id: string, @Query('startTime') startTime: string) {
    const startDate = startTime ? new Date(startTime) : new Date(0);
    return this.assetService.getAssetEvents(id, startDate);
  }

  @Get(':id/details')
  async getAssetDetails(@Param('id') id: string) {
    return this.hederaService.getFileContents(id);
  }

  // get nft collectionId:serialNumber and return file metadata.asset
  @Get(':id')
  async getIliotAsset(@Param('id') assetId: string) {
    return this.assetService.getIliotAsset(assetId);
  }

  @Get(':id/topicId')
  async getTopicId(@Param('id') assetId: string) {
    return this.assetService.getTopicId(assetId);
  }
}

```

