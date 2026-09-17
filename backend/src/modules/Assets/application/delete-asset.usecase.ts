import type { AssetsRepository } from "../domain/assets.repository.js";
import type { StorageProvider } from "@shared/domain/storage.provider.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";

export class DeleteAssetUseCase {
    constructor(
        private readonly assetsRepository: AssetsRepository,
        private readonly storageProvider: StorageProvider,
        private readonly auditLogService: AuditLogService
    ) {}

    async execute(id: string, context?: AuditContext): Promise<void> {
        const asset = await this.assetsRepository.findById(id);
        if (!asset) {
            throw new AppError("Asset not found", "ASSET_NOT_FOUND", 404);
        }

        // Delete physical object in Cloudflare R2 first
        const key = this.storageProvider.extractKeyFromUrl(asset.url);
        if (key) {
            await this.storageProvider.delete(key);
        }

        // Delete record from Database
        await this.assetsRepository.delete(id);

        // Audit Log
        await this.auditLogService.record({
            userId: context?.userId,
            action: "DELETE",
            resource: "asset",
            resourceId: id,
            context,
            details: {
                deleted: {
                    id: asset.id,
                    name: asset.name,
                    sku: asset.sku,
                    type: asset.type,
                    url: asset.url,
                    fileName: asset.fileName,
                    mimeType: asset.mimeType,
                    sizeBytes: Number(asset.sizeBytes),
                    brandId: asset.brandId,
                    folderId: asset.folderId,
                }
            },
        });
    }
}

