import type { UsersRepository } from "../domain/users.repository.js";
import type { UpdateUser, GetUser } from "../domain/user.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class UpdateUserUseCase {
    private readonly usersRepository;
    private readonly auditLogService;
    constructor(usersRepository: UsersRepository, auditLogService: AuditLogService);
    execute(id: string, data: UpdateUser, context?: AuditContext): Promise<GetUser>;
}
//# sourceMappingURL=update-user.usecase.d.ts.map