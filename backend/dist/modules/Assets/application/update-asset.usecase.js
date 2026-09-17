import path from "path";
import { AssetType } from "@prisma/client";
import AppError from "../../../shared/errors/AppError.js";
export class UpdateAssetUseCase {
    assetsRepository;
    brandsRepository;
    foldersRepository;
    storageProvider;
    auditLogService;
    constructor(assetsRepository, brandsRepository, foldersRepository, storageProvider, auditLogService) {
        this.assetsRepository = assetsRepository;
        this.brandsRepository = brandsRepository;
        this.foldersRepository = foldersRepository;
        this.storageProvider = storageProvider;
        this.auditLogService = auditLogService;
    }
    determineAssetType(mimeType) {
        const mime = mimeType.toLowerCase();
        if (mime.startsWith("image/"))
            return AssetType.IMAGE;
        if (mime.startsWith("video/"))
            return AssetType.VIDEO;
        if (mime.startsWith("audio/"))
            return AssetType.AUDIO;
        if (mime === "application/pdf" ||
            mime.includes("document") ||
            mime.includes("sheet") ||
            mime.includes("msword") ||
            mime.includes("presentation") ||
            mime.startsWith("text/")) {
            return AssetType.DOCUMENT;
        }
        if (mime.includes("zip") ||
            mime.includes("tar") ||
            mime.includes("rar") ||
            mime.includes("compressed") ||
            mime.includes("archive")) {
            return AssetType.ARCHIVE;
        }
        return AssetType.OTHER;
    }
    async execute(id, data, context) {
        // 1. Fetch current asset
        const currentAsset = await this.assetsRepository.findById(id);
        if (!currentAsset) {
            throw new AppError("Asset not found", "ASSET_NOT_FOUND", 404);
        }
        const effectiveBrandId = data.brandId || currentAsset.brandId;
        // 2. Validate Brand if changed
        if (data.brandId && data.brandId !== currentAsset.brandId) {
            const brand = await this.brandsRepository.findById(data.brandId);
            if (!brand) {
                throw new AppError("Brand not found", "BRAND_NOT_FOUND", 404);
            }
        }
        // 3. Validate Folder if changed
        if (data.folderId !== undefined) {
            if (data.folderId !== null) {
                const folder = await this.foldersRepository.findById(data.folderId);
                if (!folder) {
                    throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
                }
                if (folder.brandId !== effectiveBrandId) {
                    throw new AppError("Folder belongs to a different brand", "FOLDER_DIFFERENT_BRAND", 400);
                }
            }
        }
        const repoUpdateData = {};
        if (data.name !== undefined)
            repoUpdateData.name = data.name.trim();
        if (data.description !== undefined)
            repoUpdateData.description = data.description ? data.description.trim() : null;
        if (data.sku !== undefined)
            repoUpdateData.sku = data.sku ? data.sku.trim() : null;
        if (data.brandId !== undefined)
            repoUpdateData.brandId = data.brandId;
        if (data.folderId !== undefined)
            repoUpdateData.folderId = data.folderId;
        let fileDetails = null;
        // 4. Handle Physical File Replacement if a new file is uploaded
        if (data.file && data.file.buffer && data.file.buffer.length > 0) {
            const originalName = data.file.originalname;
            const mimeType = data.file.mimetype;
            const sizeBytes = BigInt(data.file.size);
            const parsedExt = path.extname(originalName).replace(/^\./, "").toLowerCase();
            const extension = parsedExt || null;
            const type = this.determineAssetType(mimeType);
            fileDetails = {
                oldFileName: currentAsset.fileName,
                newFileName: originalName,
                oldMimeType: currentAsset.mimeType,
                newMimeType: mimeType,
                oldSizeBytes: Number(currentAsset.sizeBytes),
                newSizeBytes: Number(data.file.size)
            };
            // STABLE URL & KEY: Extract current key and overwrite in R2
            const existingKey = this.storageProvider.extractKeyFromUrl(currentAsset.url);
            await this.storageProvider.replace({
                key: existingKey,
                buffer: data.file.buffer,
                mimeType,
            });
            // Keep the EXACT same URL, update technical metadata
            repoUpdateData.url = currentAsset.url;
            repoUpdateData.fileName = originalName;
            repoUpdateData.mimeType = mimeType;
            repoUpdateData.sizeBytes = sizeBytes;
            repoUpdateData.extension = extension;
            repoUpdateData.type = type;
        }
        // 5. Update Database Record
        const updatedAsset = await this.assetsRepository.update(id, repoUpdateData);
        // 6. Audit Log
        await this.auditLogService.record({
            userId: context?.userId,
            action: "UPDATE",
            resource: "asset",
            resourceId: updatedAsset.id,
            context,
            before: {
                name: currentAsset.name,
                description: currentAsset.description,
                sku: currentAsset.sku,
                brandId: currentAsset.brandId,
                folderId: currentAsset.folderId,
                fileName: currentAsset.fileName,
                mimeType: currentAsset.mimeType,
                sizeBytes: Number(currentAsset.sizeBytes),
                type: currentAsset.type
            },
            after: {
                name: updatedAsset.name,
                description: updatedAsset.description,
                sku: updatedAsset.sku,
                brandId: updatedAsset.brandId,
                folderId: updatedAsset.folderId,
                fileName: updatedAsset.fileName,
                mimeType: updatedAsset.mimeType,
                sizeBytes: Number(updatedAsset.sizeBytes),
                type: updatedAsset.type
            },
            details: {
                fileReplaced: Boolean(data.file),
                ...(fileDetails ? { file: fileDetails } : {})
            }
        });
        return updatedAsset;
    }
}
//# sourceMappingURL=update-asset.usecase.js.map