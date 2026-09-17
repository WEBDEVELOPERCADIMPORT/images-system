import type { AssetsRepository } from "../domain/assets.repository.js";
import type { AssetEntity, ListAssetsFilters } from "../domain/asset.entity.js";
import AppError from "@shared/errors/AppError.js";

interface ListAssetsParams {
    page?: number;
    limit?: number;
    filters?: ListAssetsFilters;
}

export class ListAssetsUseCase {
    constructor(private readonly assetsRepository: AssetsRepository) {}

    async execute(params: ListAssetsParams): Promise<{ data: AssetEntity[]; total: number }> {
        try {
            const page = params.page || 1;
            const limit = params.limit || 10;
            return await this.assetsRepository.findAllPaginated(page, limit, params.filters);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching assets", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
