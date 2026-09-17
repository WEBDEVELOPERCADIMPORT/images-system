import AppError from "../../../shared/errors/AppError.js";
export class ListAssetsUseCase {
    assetsRepository;
    constructor(assetsRepository) {
        this.assetsRepository = assetsRepository;
    }
    async execute(params) {
        try {
            const page = params.page || 1;
            const limit = params.limit || 10;
            return await this.assetsRepository.findAllPaginated(page, limit, params.filters);
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching assets", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=list-assets.usecase.js.map