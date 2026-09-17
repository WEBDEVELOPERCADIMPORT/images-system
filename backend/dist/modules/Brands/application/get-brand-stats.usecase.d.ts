import type { BrandsRepository } from "../domain/brands.repository.js";
export declare class GetBrandStatsUseCase {
    private readonly brandsRepository;
    constructor(brandsRepository: BrandsRepository);
    execute(): Promise<{
        totalBrands: number;
        totalFolders: number;
        totalImages: number;
        totalAssets?: number;
    }>;
}
//# sourceMappingURL=get-brand-stats.usecase.d.ts.map