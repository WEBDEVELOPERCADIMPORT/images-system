import type { UsersRepository } from "../domain/users.repository.js";
import type { GetUser } from "../domain/user.entity.js";
import type { HashProvider } from "../../../shared/domain/hash.provider.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
interface CreateUserRequest {
    email: string;
    passwordRaw: string;
    firstName: string;
    lastName: string;
    roles?: string[];
}
export declare class CreateUserUseCase {
    private readonly usersRepository;
    private readonly hashProvider;
    private readonly auditLogService;
    constructor(usersRepository: UsersRepository, hashProvider: HashProvider, auditLogService: AuditLogService);
    execute(data: CreateUserRequest, context?: AuditContext): Promise<GetUser>;
}
export {};
//# sourceMappingURL=create-user.usecase.d.ts.map