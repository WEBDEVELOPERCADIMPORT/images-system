import type { AuditLogService, RecordAuditParams } from "./audit-log.service.js";
import type { AuditLog, CreateAuditLog } from "../domain/audit-log.entity.js";
export declare class CreateAuditLogUseCase {
    private readonly auditLogService;
    constructor(auditLogService: AuditLogService);
    execute(data: CreateAuditLog | RecordAuditParams): Promise<AuditLog | null>;
}
//# sourceMappingURL=create-audit-log.usecase.d.ts.map