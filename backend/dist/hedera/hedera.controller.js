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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaController = void 0;
const common_1 = require("@nestjs/common");
const hedera_service_1 = require("./hedera.service");
let HederaController = class HederaController {
    constructor(hederaService) {
        this.hederaService = hederaService;
    }
    async createAccount() {
        return this.hederaService.createAccount();
    }
    async getBalance(accountId) {
        return this.hederaService.getAccountBalance(accountId);
    }
    async transferHbar(from, to, amount) {
        return this.hederaService.transferHbar(from, to, amount);
    }
    async createNFTCollection(body) {
        return this.hederaService.createNFTCollection(body.name, body.symbol);
    }
    async mintNFT(body) {
        return this.hederaService.mintNFT(body.tokenId, body.metadata);
    }
    async getCollectionInfo(tokenId) {
        return this.hederaService.getCollectionInfo(tokenId);
    }
    async getMessages(topicId, startTime) {
        return this.hederaService.getMessages(topicId, new Date(startTime), 10, 1000);
    }
};
exports.HederaController = HederaController;
__decorate([
    (0, common_1.Post)('account'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)('balance/:accountId'),
    __param(0, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('transfer'),
    __param(0, (0, common_1.Body)('from')),
    __param(1, (0, common_1.Body)('to')),
    __param(2, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "transferHbar", null);
__decorate([
    (0, common_1.Post)('nft/collection'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "createNFTCollection", null);
__decorate([
    (0, common_1.Post)('nft/mint'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "mintNFT", null);
__decorate([
    (0, common_1.Get)('colleciton/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "getCollectionInfo", null);
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Query)('topicId')),
    __param(1, (0, common_1.Query)('startTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HederaController.prototype, "getMessages", null);
exports.HederaController = HederaController = __decorate([
    (0, common_1.Controller)('hedera'),
    __metadata("design:paramtypes", [hedera_service_1.HederaService])
], HederaController);
//# sourceMappingURL=hedera.controller.js.map