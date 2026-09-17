import type { AssetEntity, CreateAssetRepoInput, UpdateAssetRepoInput, ListAssetsFilters } from "./asset.entity.js";
export interface AssetsRepository {
    create(data: CreateAssetRepoInput): Promise<AssetEntity>;
    findById(id: string): Promise<AssetEntity | null>;
    findByUrl(url: string): Promise<AssetEntity | null>;
    findAllPaginated(page: number, limit: number, filters?: ListAssetsFilters): Promise<{
        data: AssetEntity[];
        total: number;
    }>;
    update(id: string, data: UpdateAssetRepoInput): Promise<AssetEntity>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=assets.repository.d.ts.map