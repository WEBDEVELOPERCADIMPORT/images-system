export class LogoutUseCase {
    authRepository;
    auditLogService;
    constructor(authRepository, auditLogService) {
        this.authRepository = authRepository;
        this.auditLogService = auditLogService;
    }
    async execute(userId, context) {
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
//# sourceMappingURL=logout.usecase.js.map