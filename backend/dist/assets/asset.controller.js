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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetController = void 0;
const common_1 = require("@nestjs/common");
const asset_service_1 = require("./asset.service");
const create_asset_dto_1 = require("../models/create-asset.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const hedera_service_1 = require("../hedera/hedera.service");
let AssetController = class AssetController {
    constructor(assetService, hederaService) {
        this.assetService = assetService;
        this.hederaService = hederaService;
    }
    async createAsset(createAssetDto) {
        return this.assetService.createAsset(createAssetDto);
    }
    async createAssetEvent(topicId, event) {
        return this.hederaService.submitMessage(topicId, JSON.stringify(event));
    }
};
exports.AssetController = AssetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_asset_dto_1.CreateAssetDto]),
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
exports.AssetController = AssetController = __decorate([
    (0, common_1.Controller)('assets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof asset_service_1.AssetService !== "undefined" && asset_service_1.AssetService) === "function" ? _a : Object, hedera_service_1.HederaService])
], AssetController);
//# sourceMappingURL=asset.controller.js.map