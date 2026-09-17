import type { AssetsRepository } from "../domain/assets.repository.js";
import type { AssetEntity, ListAssetsFilters } from "../domain/asset.entity.js";
interface ListAssetsParams {
    page?: number;
    limit?: number;
    filters?: ListAssetsFilters;
}
export declare class ListAssetsUseCase {
    private readonly assetsRepository;
    constructor(assetsRepository: AssetsRepository);
    execute(params: ListAssetsParams): Promise<{
        data: AssetEntity[];
        total: number;
    }>;
}
export {};
//# sourceMappingURL=list-assets.usecase.d.ts.map