import AppError from "../../../shared/errors/AppError.js";
import { UniqueConstraintError } from "../../../shared/db/database/errors/UniqueConstraintError.js";
export class CreateUserUseCase {
    usersRepository;
    hashProvider;
    auditLogService;
    constructor(usersRepository, hashProvider, auditLogService) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.auditLogService = auditLogService;
    }
    async execute(data, context) {
        try {
            const existingUser = await this.usersRepository.findByEmail(data.email);
            if (existingUser) {
                throw new AppError("Email already in use", "EMAIL_ALREADY_EXISTS", 400);
            }
            const passwordHash = await this.hashProvider.hash(data.passwordRaw);
            const user = await this.usersRepository.create({
                email: data.email,
                passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                roles: data.roles
            });
            await this.auditLogService.record({
                userId: context?.userId,
                action: 'CREATE',
                resource: 'user',
                resourceId: user.id,
                context,
                details: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles: user.roles,
                    isActive: user.isActive
                }
            });
            return user;
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new AppError("Email already in use", "EMAIL_ALREADY_EXISTS", 400);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error creating user", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=create-user.usecase.js.map