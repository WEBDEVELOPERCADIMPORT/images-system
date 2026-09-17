import type { FoldersRepository } from "../domain/folders.repository.js";
import type { UpdateFolder, GetFolder } from "../domain/folder.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class UpdateFolderUseCase {
    private readonly foldersRepository;
    private readonly auditLogService;
    constructor(foldersRepository: FoldersRepository, auditLogService: AuditLogService);
    execute(id: string, data: UpdateFolder, context?: AuditContext): Promise<GetFolder>;
}
//# sourceMappingURL=update-folder.usecase.d.ts.map