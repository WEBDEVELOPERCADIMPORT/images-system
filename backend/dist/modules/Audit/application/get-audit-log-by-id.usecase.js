import AppError from "../../../shared/errors/AppError.js";
export class GetAuditLogByIdUseCase {
    auditRepository;
    constructor(auditRepository) {
        this.auditRepository = auditRepository;
    }
    async execute(id) {
        try {
            const log = await this.auditRepository.findById(id);
            if (!log) {
                throw new AppError("Audit log not found", "AUDIT_LOG_NOT_FOUND", 404);
            }
            return log;
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching audit log detail", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=get-audit-log-by-id.usecase.js.map