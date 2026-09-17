import type { BrandsRepository } from "../domain/brands.repository.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class DeleteBrandUseCase {
    private readonly brandsRepository;
    private readonly auditLogService;
    constructor(brandsRepository: BrandsRepository, auditLogService: AuditLogService);
    execute(id: string, context?: AuditContext): Promise<void>;
}
//# sourceMappingURL=delete-brand.usecase.d.ts.map