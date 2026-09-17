import AppError from "../../../shared/errors/AppError.js";
import { NotFoundPersistenceError } from "../../../shared/db/database/errors/NotFoundPersistenceError.js";
export class DeleteUserUseCase {
    usersRepository;
    auditLogService;
    constructor(usersRepository, auditLogService) {
        this.usersRepository = usersRepository;
        this.auditLogService = auditLogService;
    }
    async execute(id, context) {
        try {
            const user = await this.usersRepository.findById(id);
            if (!user) {
                throw new AppError("User not found", "USER_NOT_FOUND", 404);
            }
            const deletedUser = await this.usersRepository.softDelete(id);
            await this.auditLogService.record({
                userId: context?.userId,
                action: 'DELETE',
                resource: 'user',
                resourceId: id,
                context,
                details: {
                    deleted: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        roles: user.roles
                    }
                }
            });
            return deletedUser;
        }
        catch (error) {
            if (error instanceof NotFoundPersistenceError) {
                throw new AppError("User not found", "USER_NOT_FOUND", 404);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting user", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=delete-user.usecase.js.map