import type { AuditRepository } from "../domain/audit.repository.js";
import type { AuditLog } from "../domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";

export class GetAuditLogByIdUseCase {
    constructor(private readonly auditRepository: AuditRepository) {}

    async execute(id: string): Promise<AuditLog> {
        try {
            const log = await this.auditRepository.findById(id);
            if (!log) {
                throw new AppError("Audit log not found", "AUDIT_LOG_NOT_FOUND", 404);
            }
            return log;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching audit log detail", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
