import type { AuditLog, CreateAuditLog, AuditFilters } from "./audit-log.entity.js";

export interface AuditRepository {
    create(data: CreateAuditLog): Promise<AuditLog>;
    findAll(
        page: number,
        limit: number,
        filters?: AuditFilters
    ): Promise<{
        data: AuditLog[];
        total: number;
    }>;
    findById(id: string): Promise<AuditLog | null>;
}

