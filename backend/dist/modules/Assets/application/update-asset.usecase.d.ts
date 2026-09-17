import type { AssetsRepository } from "../domain/assets.repository.js";
import type { UpdateAssetInput, AssetEntity } from "../domain/asset.entity.js";
import type { BrandsRepository } from "../../Brands/domain/brands.repository.js";
import type { FoldersRepository } from "../../Folders/domain/folders.repository.js";
import type { StorageProvider } from "../../../shared/domain/storage.provider.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class UpdateAssetUseCase {
    private readonly assetsRepository;
    private readonly brandsRepository;
    private readonly foldersRepository;
    private readonly storageProvider;
    private readonly auditLogService;
    constructor(assetsRepository: AssetsRepository, brandsRepository: BrandsRepository, foldersRepository: FoldersRepository, storageProvider: StorageProvider, auditLogService: AuditLogService);
    private determineAssetType;
    execute(id: string, data: UpdateAssetInput, context?: AuditContext): Promise<AssetEntity>;
}
//# sourceMappingURL=update-asset.usecase.d.ts.map