import type { UsersRepository } from "../domain/users.repository.js";
import type { GetUser } from "../domain/user.entity.js";
import AppError from "@shared/errors/AppError.js";
import { NotFoundPersistenceError } from "@shared/db/database/errors/NotFoundPersistenceError.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";

export class DisableUserUseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly auditLogService: AuditLogService
    ) {}

    async execute(id: string, context?: AuditContext): Promise<GetUser> {
        try {
            const user = await this.usersRepository.findById(id);
            if (!user) {
                throw new AppError("User not found", "USER_NOT_FOUND", 404);
            }

            const disabledUser = await this.usersRepository.disable(id);

            await this.auditLogService.record({
                userId: context?.userId,
                action: 'UPDATE',
                resource: 'user',
                resourceId: id,
                context,
                before: { isActive: user.isActive },
                after: { isActive: disabledUser.isActive },
                details: {
                    userEmail: user.email,
                    description: "User disabled/deactivated"
                }
            });

            return disabledUser;
        } catch (error) {
            if (error instanceof NotFoundPersistenceError) {
                throw new AppError("User not found", "USER_NOT_FOUND", 404);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error disabling user", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}

