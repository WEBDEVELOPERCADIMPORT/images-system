import type { AuditRepository } from "../domain/audit.repository.js";
import type { AuditLog, AuditFilters } from "../domain/audit-log.entity.js";
export interface ListAuditLogsParams {
    page?: number;
    limit?: number;
    filters?: AuditFilters;
}
export declare class ListAuditLogsUseCase {
    private readonly auditRepository;
    constructor(auditRepository: AuditRepository);
    execute(params?: ListAuditLogsParams): Promise<{
        data: AuditLog[];
        total: number;
    }>;
}
//# sourceMappingURL=list-audit-logs.usecase.d.ts.map