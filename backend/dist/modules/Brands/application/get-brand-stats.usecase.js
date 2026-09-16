import AppError from "../../../shared/errors/AppError.js";
export class GetBrandStatsUseCase {
    brandsRepository;
    constructor(brandsRepository) {
        this.brandsRepository = brandsRepository;
    }
    async execute() {
        try {
            return await this.brandsRepository.getStats();
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching stats", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=get-brand-stats.usecase.js.map