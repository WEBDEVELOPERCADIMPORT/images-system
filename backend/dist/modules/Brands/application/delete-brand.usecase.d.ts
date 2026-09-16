import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
export declare class DeleteBrandUseCase {
    private readonly brandsRepository;
    private readonly createAuditLogUseCase;
    constructor(brandsRepository: BrandsRepository, createAuditLogUseCase: CreateAuditLogUseCase);
    execute(id: string, userId?: string | null): Promise<void>;
}
//# sourceMappingURL=delete-brand.usecase.d.ts.map