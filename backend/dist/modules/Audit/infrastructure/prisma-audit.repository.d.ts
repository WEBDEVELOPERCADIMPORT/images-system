import type { PrismaClient } from "@prisma/client";
import type { AuditRepository } from "../domain/audit.repository.js";
import type { AuditLog, CreateAuditLog, AuditFilters } from "../domain/audit-log.entity.js";
export declare class PrismaAuditRepository implements AuditRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: CreateAuditLog): Promise<AuditLog>;
    findAll(page: number, limit: number, filters?: AuditFilters): Promise<{
        data: AuditLog[];
        total: number;
    }>;
    findById(id: string): Promise<AuditLog | null>;
}
//# sourceMappingURL=prisma-audit.repository.d.ts.map