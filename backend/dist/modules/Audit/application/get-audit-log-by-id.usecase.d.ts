import type { AuditRepository } from "../domain/audit.repository.js";
import type { AuditLog } from "../domain/audit-log.entity.js";
export declare class GetAuditLogByIdUseCase {
    private readonly auditRepository;
    constructor(auditRepository: AuditRepository);
    execute(id: string): Promise<AuditLog>;
}
//# sourceMappingURL=get-audit-log-by-id.usecase.d.ts.map