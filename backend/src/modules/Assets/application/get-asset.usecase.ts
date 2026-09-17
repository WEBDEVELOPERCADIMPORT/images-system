import type { AssetsRepository } from "../domain/assets.repository.js";
import type { AssetEntity } from "../domain/asset.entity.js";
import AppError from "@shared/errors/AppError.js";

export class GetAssetUseCase {
    constructor(private readonly assetsRepository: AssetsRepository) {}

    async execute(id: string): Promise<AssetEntity> {
        try {
            const asset = await this.assetsRepository.findById(id);
            if (!asset) {
                throw new AppError("Asset not found", "ASSET_NOT_FOUND", 404);
            }
            return asset;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching asset", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
