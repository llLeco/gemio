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
exports.AssetController = void 0;
const common_1 = require("@nestjs/common");
const asset_service_1 = require("./asset.service");
const hedera_service_1 = require("../hedera/hedera.service");
let AssetController = class AssetController {
    constructor(assetService, hederaService) {
        this.assetService = assetService;
        this.hederaService = hederaService;
    }
    async createAsset(createAsset) {
        return this.assetService.createAsset(createAsset.collectionId, createAsset.assetData);
    }
    async createAssetEvent(id, event) {
        return this.assetService.createAssetEvent(id, event);
    }
    async getAssetEvents(id, startTime) {
        const startDate = startTime ? new Date(startTime) : new Date(0);
        return this.assetService.getAssetEvents(id, startDate);
    }
    async getAssetDetails(id) {
        return this.hederaService.getFileContents(id);
    }
    async getIliotAsset(assetId) {
        return this.assetService.getIliotAsset(assetId);
    }
    async getTopicId(assetId) {
        return this.assetService.getTopicId(assetId);
    }
};
exports.AssetController = AssetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "createAsset", null);
__decorate([
    (0, common_1.Post)(':id/events'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "createAssetEvent", null);
__decorate([
    (0, common_1.Get)(':id/events'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "getAssetEvents", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "getAssetDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "getIliotAsset", null);
__decorate([
    (0, common_1.Get)(':id/topicId'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "getTopicId", null);
exports.AssetController = AssetController = __decorate([
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [asset_service_1.AssetService,
        hedera_service_1.HederaService])
], AssetController);
//# sourceMappingURL=asset.controller.js.map