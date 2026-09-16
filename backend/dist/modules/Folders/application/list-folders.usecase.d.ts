import type { FoldersRepository } from "../domain/folders.repository.js";
import type { GetFolder } from "../domain/folder.entity.js";
export interface ListFoldersParams {
    brandId?: string;
    parentId?: string | null;
    page?: number;
    limit?: number;
    q?: string;
    all?: boolean;
}
export interface ListFoldersResult {
    data: GetFolder[];
    total: number;
}
export declare class ListFoldersUseCase {
    private readonly foldersRepository;
    constructor(foldersRepository: FoldersRepository);
    execute(params?: ListFoldersParams): Promise<ListFoldersResult | GetFolder[]>;
}
//# sourceMappingURL=list-folders.usecase.d.ts.map