import type { AuditRepository } from "../domain/audit.repository.js";
import type { AuditLog, AuditFilters } from "../domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";

export interface ListAuditLogsParams {
    page?: number;
    limit?: number;
    filters?: AuditFilters;
}

export class ListAuditLogsUseCase {
    constructor(private readonly auditRepository: AuditRepository) {}

    async execute(params: ListAuditLogsParams = {}): Promise<{ data: AuditLog[]; total: number }> {
        try {
            const page = params.page || 1;
            const limit = params.limit || 10;
            return await this.auditRepository.findAll(page, limit, params.filters);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching audit logs", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}

