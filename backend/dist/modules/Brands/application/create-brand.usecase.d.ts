import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateBrand, GetBrand } from "../domain/brand.entity.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
export declare class CreateBrandUseCase {
    private readonly brandsRepository;
    private readonly createAuditLogUseCase;
    constructor(brandsRepository: BrandsRepository, createAuditLogUseCase: CreateAuditLogUseCase);
    execute(data: CreateBrand, userId?: string | null): Promise<GetBrand>;
}
//# sourceMappingURL=create-brand.usecase.d.ts.map