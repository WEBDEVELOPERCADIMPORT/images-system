import type { FoldersRepository } from "../domain/folders.repository.js";
import type { GetFolder } from "../domain/folder.entity.js";
export interface FolderWithBreadcrumbs extends GetFolder {
    breadcrumbs: Array<{
        id: string;
        name: string;
        parentId: string | null;
    }>;
}
export declare class GetFolderUseCase {
    private readonly foldersRepository;
    constructor(foldersRepository: FoldersRepository);
    execute(id: string): Promise<FolderWithBreadcrumbs>;
}
//# sourceMappingURL=get-folder.usecase.d.ts.map