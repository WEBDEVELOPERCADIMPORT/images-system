import type { BrandsRepository } from "../domain/brands.repository.js";
import AppError from "@shared/errors/AppError.js";

export class GetBrandStatsUseCase {
    constructor(private readonly brandsRepository: BrandsRepository) {}

    async execute(): Promise<{ totalBrands: number; totalFolders: number; totalImages: number }> {
        try {
            return await this.brandsRepository.getStats();
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching stats", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
