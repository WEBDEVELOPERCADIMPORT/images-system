import type { AuthRepository } from "../domain/auth.repository.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";

export class LogoutUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly auditLogService: AuditLogService
    ) { }

    async execute(userId: string, context?: AuditContext): Promise<void> {
        // Delete session record from database
        await this.authRepository.deleteSession(userId);

        // Record audit log
        await this.auditLogService.record({
            userId,
            action: "LOGOUT",
            resource: "auth",
            resourceId: userId,
            context
        });
    }
}
