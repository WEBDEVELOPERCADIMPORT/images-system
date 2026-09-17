export class CreateAuditLogUseCase {
    auditLogService;
    constructor(auditLogService) {
        this.auditLogService = auditLogService;
    }
    async execute(data) {
        return await this.auditLogService.record(data);
    }
}
//# sourceMappingURL=create-audit-log.usecase.js.map