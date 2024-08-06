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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const collection_service_1 = require("./collection.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CollectionController = class CollectionController {
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    async createCollection(collectionData) {
        return this.collectionService.createCollection(collectionData.name, collectionData.symbol, collectionData.description);
    }
    async getCollection(id) {
        return this.collectionService.getCollection(id);
    }
    async getAssetsInCollection(collectionId) {
        return this.collectionService.getAssetsInCollection(collectionId);
    }
    async createAsset(collectionId, assetData) {
        return this.collectionService.createAsset(collectionId, assetData);
    }
    async getCollectionsAndNFTs(req) {
        return this.collectionService.getCollectionsAndNFTs(req.user.hederaAccountId);
    }
};
exports.CollectionController = CollectionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "createCollection", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollection", null);
__decorate([
    (0, common_1.Get)(':id/assets'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getAssetsInCollection", null);
__decorate([
    (0, common_1.Post)(':id/assets'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "createAsset", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionsAndNFTs", null);
exports.CollectionController = CollectionController = __decorate([
    (0, common_1.Controller)('collections'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionController);
//# sourceMappingURL=collection.controller.js.map