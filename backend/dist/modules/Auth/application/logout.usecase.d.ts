import type { AuthRepository } from "../domain/auth.repository.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class LogoutUseCase {
    private readonly authRepository;
    private readonly auditLogService;
    constructor(authRepository: AuthRepository, auditLogService: AuditLogService);
    execute(userId: string, context?: AuditContext): Promise<void>;
}
//# sourceMappingURL=logout.usecase.d.ts.map