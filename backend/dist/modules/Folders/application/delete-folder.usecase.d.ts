import type { FoldersRepository } from "../domain/folders.repository.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class DeleteFolderUseCase {
    private readonly foldersRepository;
    private readonly auditLogService;
    constructor(foldersRepository: FoldersRepository, auditLogService: AuditLogService);
    execute(id: string, context?: AuditContext): Promise<void>;
}
//# sourceMappingURL=delete-folder.usecase.d.ts.map