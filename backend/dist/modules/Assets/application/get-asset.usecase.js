import AppError from "../../../shared/errors/AppError.js";
export class GetAssetUseCase {
    assetsRepository;
    constructor(assetsRepository) {
        this.assetsRepository = assetsRepository;
    }
    async execute(id) {
        try {
            const asset = await this.assetsRepository.findById(id);
            if (!asset) {
                throw new AppError("Asset not found", "ASSET_NOT_FOUND", 404);
            }
            return asset;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching asset", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=get-asset.usecase.js.map