import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateBrand, GetBrand } from "../domain/brand.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class CreateBrandUseCase {
    private readonly brandsRepository;
    private readonly auditLogService;
    constructor(brandsRepository: BrandsRepository, auditLogService: AuditLogService);
    execute(data: CreateBrand, context?: AuditContext): Promise<GetBrand>;
}
//# sourceMappingURL=create-brand.usecase.d.ts.map