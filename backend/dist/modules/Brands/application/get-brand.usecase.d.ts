import type { BrandsRepository } from "../domain/brands.repository.js";
import type { GetBrand } from "../domain/brand.entity.js";
export declare class GetBrandUseCase {
    private readonly brandsRepository;
    constructor(brandsRepository: BrandsRepository);
    execute(id: string): Promise<GetBrand>;
}
//# sourceMappingURL=get-brand.usecase.d.ts.map