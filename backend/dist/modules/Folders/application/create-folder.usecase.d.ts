import type { FoldersRepository } from "../domain/folders.repository.js";
import type { BrandsRepository } from "../../Brands/domain/brands.repository.js";
import type { CreateFolder, GetFolder } from "../domain/folder.entity.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
export declare class CreateFolderUseCase {
    private readonly foldersRepository;
    private readonly brandsRepository;
    private readonly createAuditLogUseCase;
    constructor(foldersRepository: FoldersRepository, brandsRepository: BrandsRepository, createAuditLogUseCase: CreateAuditLogUseCase);
    execute(data: CreateFolder, userId?: string | null): Promise<GetFolder>;
}
//# sourceMappingURL=create-folder.usecase.d.ts.map