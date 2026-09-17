import type { AuditLogService, RecordAuditParams } from "./audit-log.service.js";
import type { AuditLog, CreateAuditLog } from "../domain/audit-log.entity.js";

export class CreateAuditLogUseCase {
    constructor(private readonly auditLogService: AuditLogService) {}

    async execute(data: CreateAuditLog | RecordAuditParams): Promise<AuditLog | null> {
        return await this.auditLogService.record(data as RecordAuditParams);
    }
}

