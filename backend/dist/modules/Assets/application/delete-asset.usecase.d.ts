import type { AssetsRepository } from "../domain/assets.repository.js";
import type { StorageProvider } from "../../../shared/domain/storage.provider.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class DeleteAssetUseCase {
    private readonly assetsRepository;
    private readonly storageProvider;
    private readonly auditLogService;
    constructor(assetsRepository: AssetsRepository, storageProvider: StorageProvider, auditLogService: AuditLogService);
    execute(id: string, context?: AuditContext): Promise<void>;
}
//# sourceMappingURL=delete-asset.usecase.d.ts.map