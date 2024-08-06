"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionModule = void 0;
const common_1 = require("@nestjs/common");
const collection_service_1 = require("./collection.service");
const collection_controller_1 = require("./collection.controller");
const hedera_module_1 = require("../hedera/hedera.module");
let CollectionModule = class CollectionModule {
};
exports.CollectionModule = CollectionModule;
exports.CollectionModule = CollectionModule = __decorate([
    (0, common_1.Module)({
        imports: [hedera_module_1.HederaModule],
        providers: [collection_service_1.CollectionService],
        controllers: [collection_controller_1.CollectionController],
        exports: [collection_service_1.CollectionService]
    })
], CollectionModule);
//# sourceMappingURL=collection.model.js.map