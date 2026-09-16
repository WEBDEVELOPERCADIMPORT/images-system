import AppError from "../../../shared/errors/AppError.js";
export class ListBrandsUseCase {
    brandsRepository;
    constructor(brandsRepository) {
        this.brandsRepository = brandsRepository;
    }
    async execute(params) {
        try {
            if (params?.all) {
                return await this.brandsRepository.findAll();
            }
            const page = params?.page && params.page > 0 ? Number(params.page) : 1;
            const limit = params?.limit && params.limit > 0 ? Number(params.limit) : 10;
            return await this.brandsRepository.findAllPaginated(page, limit, { q: params?.q });
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching brands", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=list-brands.usecase.js.map