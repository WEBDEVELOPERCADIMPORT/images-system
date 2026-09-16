import type { BrandsRepository } from "../domain/brands.repository.js";
import type { GetBrand } from "../domain/brand.entity.js";
import AppError from "@shared/errors/AppError.js";

export class GetBrandUseCase {
    constructor(private readonly brandsRepository: BrandsRepository) {}

    async execute(id: string): Promise<GetBrand> {
        try {
            const brand = await this.brandsRepository.findById(id);
            if (!brand) {
                throw new AppError("Brand not found", "BRAND_NOT_FOUND", 404);
            }
            return brand;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
