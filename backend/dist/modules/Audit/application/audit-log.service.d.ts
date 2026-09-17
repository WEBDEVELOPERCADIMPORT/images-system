import type { AuditRepository } from "../domain/audit.repository.js";
import type { AuditAction, AuditContext, AuditLog } from "../domain/audit-log.entity.js";
export interface RecordAuditParams {
    action: AuditAction;
    resource: string;
    resourceId?: string | null;
    userId?: string | null;
    context?: AuditContext;
    before?: any;
    after?: any;
    details?: any;
}
export declare class AuditLogService {
    private readonly auditRepository;
    constructor(auditRepository: AuditRepository);
    /**
     * Safely serializes objects, removing sensitive information, converting BigInts,
     * and handling circular structures or Dates.
     */
    sanitize(value: any, depth?: number): any;
    /**
     * Computes the differences between before and after states.
     */
    calculateDiff(beforeState: any, afterState: any): {
        before: Record<string, any>;
        after: Record<string, any>;
        changes: Record<string, {
            from: any;
            to: any;
        }>;
    };
    /**
     * Records an audit log entry in the repository.
     * Guaranteed to never throw errors to avoid breaking the calling business transaction.
     */
    record(params: RecordAuditParams): Promise<AuditLog | null>;
}
//# sourceMappingURL=audit-log.service.d.ts.map