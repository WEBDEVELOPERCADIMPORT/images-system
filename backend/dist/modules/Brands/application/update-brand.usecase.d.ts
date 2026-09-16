import type { BrandsRepository } from "../domain/brands.repository.js";
import type { UpdateBrand, GetBrand } from "../domain/brand.entity.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
export declare class UpdateBrandUseCase {
    private readonly brandsRepository;
    private readonly createAuditLogUseCase;
    constructor(brandsRepository: BrandsRepository, createAuditLogUseCase: CreateAuditLogUseCase);
    execute(id: string, data: UpdateBrand, userId?: string | null): Promise<GetBrand>;
}
//# sourceMappingURL=update-brand.usecase.d.ts.map