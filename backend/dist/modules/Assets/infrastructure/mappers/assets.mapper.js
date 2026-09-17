export class AssetsMapper {
    static toDomain(asset) {
        return {
            id: asset.id,
            name: asset.name,
            description: asset.description,
            url: asset.url,
            sku: asset.sku,
            type: asset.type,
            fileName: asset.fileName,
            mimeType: asset.mimeType,
            sizeBytes: Number(asset.sizeBytes),
            extension: asset.extension,
            metadata: asset.metadata,
            brandId: asset.brandId,
            folderId: asset.folderId,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
            brand: asset.brand ? {
                id: asset.brand.id,
                name: asset.brand.name,
            } : undefined,
            folder: asset.folder ? {
                id: asset.folder.id,
                name: asset.folder.name,
            } : asset.folderId === null ? null : undefined,
        };
    }
}
//# sourceMappingURL=assets.mapper.js.map