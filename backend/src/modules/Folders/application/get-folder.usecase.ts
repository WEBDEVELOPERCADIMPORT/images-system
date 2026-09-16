import type { FoldersRepository } from "../domain/folders.repository.js";
import type { GetFolder } from "../domain/folder.entity.js";
import AppError from "@shared/errors/AppError.js";

export interface FolderWithBreadcrumbs extends GetFolder {
    breadcrumbs: Array<{ id: string; name: string; parentId: string | null }>;
}

export class GetFolderUseCase {
    constructor(private readonly foldersRepository: FoldersRepository) {}

    async execute(id: string): Promise<FolderWithBreadcrumbs> {
        try {
            const folder = await this.foldersRepository.findById(id);
            if (!folder) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }

            const breadcrumbs = await this.foldersRepository.getBreadcrumbs(id);

            return {
                ...folder,
                breadcrumbs
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
