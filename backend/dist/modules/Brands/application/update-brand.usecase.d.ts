import type { BrandsRepository } from "../domain/brands.repository.js";
import type { UpdateBrand, GetBrand } from "../domain/brand.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class UpdateBrandUseCase {
    private readonly brandsRepository;
    private readonly auditLogService;
    constructor(brandsRepository: BrandsRepository, auditLogService: AuditLogService);
    execute(id: string, data: UpdateBrand, context?: AuditContext): Promise<GetBrand>;
}
//# sourceMappingURL=update-brand.usecase.d.ts.map