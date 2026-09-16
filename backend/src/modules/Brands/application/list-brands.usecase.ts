import type { BrandsRepository } from "../domain/brands.repository.js";
import type { GetBrand } from "../domain/brand.entity.js";
import AppError from "@shared/errors/AppError.js";

export interface ListBrandsParams {
    page?: number;
    limit?: number;
    q?: string;
    all?: boolean;
}

export interface ListBrandsResult {
    data: GetBrand[];
    total: number;
}

export class ListBrandsUseCase {
    constructor(private readonly brandsRepository: BrandsRepository) {}

    async execute(params?: ListBrandsParams): Promise<ListBrandsResult | GetBrand[]> {
        try {
            if (params?.all) {
                return await this.brandsRepository.findAll();
            }

            const page = params?.page && params.page > 0 ? Number(params.page) : 1;
            const limit = params?.limit && params.limit > 0 ? Number(params.limit) : 10;
            return await this.brandsRepository.findAllPaginated(page, limit, { q: params?.q });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching brands", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
