import type { FoldersRepository } from "../domain/folders.repository.js";
import type { BrandsRepository } from "../../Brands/domain/brands.repository.js";
import type { CreateFolder, GetFolder } from "../domain/folder.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
export declare class CreateFolderUseCase {
    private readonly foldersRepository;
    private readonly brandsRepository;
    private readonly auditLogService;
    constructor(foldersRepository: FoldersRepository, brandsRepository: BrandsRepository, auditLogService: AuditLogService);
    execute(data: CreateFolder, context?: AuditContext): Promise<GetFolder>;
}
//# sourceMappingURL=create-folder.usecase.d.ts.map