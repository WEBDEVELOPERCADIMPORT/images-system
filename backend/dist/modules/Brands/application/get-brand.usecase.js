import AppError from "../../../shared/errors/AppError.js";
export class GetBrandUseCase {
    brandsRepository;
    constructor(brandsRepository) {
        this.brandsRepository = brandsRepository;
    }
    async execute(id) {
        try {
            const brand = await this.brandsRepository.findById(id);
            if (!brand) {
                throw new AppError("Brand not found", "BRAND_NOT_FOUND", 404);
            }
            return brand;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=get-brand.usecase.js.map