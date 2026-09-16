import type { FoldersRepository } from "../domain/folders.repository.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
export declare class DeleteFolderUseCase {
    private readonly foldersRepository;
    private readonly createAuditLogUseCase;
    constructor(foldersRepository: FoldersRepository, createAuditLogUseCase: CreateAuditLogUseCase);
    execute(id: string, userId?: string | null): Promise<void>;
}
//# sourceMappingURL=delete-folder.usecase.d.ts.map