import type { BrandsRepository } from "../domain/brands.repository.js";
import type { GetBrand } from "../domain/brand.entity.js";
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
export declare class ListBrandsUseCase {
    private readonly brandsRepository;
    constructor(brandsRepository: BrandsRepository);
    execute(params?: ListBrandsParams): Promise<ListBrandsResult | GetBrand[]>;
}
//# sourceMappingURL=list-brands.usecase.d.ts.map