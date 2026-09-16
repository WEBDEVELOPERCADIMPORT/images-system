import type { FoldersRepository } from "../domain/folders.repository.js";
import type { UpdateFolder, GetFolder } from "../domain/folder.entity.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
export declare class UpdateFolderUseCase {
    private readonly foldersRepository;
    private readonly createAuditLogUseCase;
    constructor(foldersRepository: FoldersRepository, createAuditLogUseCase: CreateAuditLogUseCase);
    execute(id: string, data: UpdateFolder, userId?: string | null): Promise<GetFolder>;
}
//# sourceMappingURL=update-folder.usecase.d.ts.map