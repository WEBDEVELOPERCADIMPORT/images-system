import type { AssetsRepository } from "../domain/assets.repository.js";
import type { AssetEntity } from "../domain/asset.entity.js";
export declare class GetAssetUseCase {
    private readonly assetsRepository;
    constructor(assetsRepository: AssetsRepository);
    execute(id: string): Promise<AssetEntity>;
}
//# sourceMappingURL=get-asset.usecase.d.ts.map