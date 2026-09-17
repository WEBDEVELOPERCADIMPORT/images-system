import type { FoldersRepository } from "../domain/folders.repository.js";
import type { UpdateFolder, GetFolder } from "../domain/folder.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";
import { UniqueConstraintError } from "@shared/db/database/errors/UniqueConstraintError.js";

export class UpdateFolderUseCase {
    constructor(
        private readonly foldersRepository: FoldersRepository,
        private readonly auditLogService: AuditLogService
    ) { }

    async execute(id: string, data: UpdateFolder, context?: AuditContext): Promise<GetFolder> {

        try {
            const existing = await this.foldersRepository.findById(id);
            if (!existing) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }

            let newParentId = existing.parentId;
            if (data.parentId !== undefined) {
                newParentId = data.parentId ? data.parentId : null;

                if (newParentId === id) {
                    throw new AppError("A folder cannot be its own parent", "FOLDER_CYCLE_DETECTED", 400);
                }

                if (newParentId !== null) {
                    const targetParent = await this.foldersRepository.findById(newParentId);
                    if (!targetParent) {
                        throw new AppError("Parent folder not found", "PARENT_FOLDER_NOT_FOUND", 404);
                    }
                    if (targetParent.brandId !== existing.brandId) {
                        throw new AppError("Parent folder belongs to a different brand", "PARENT_FOLDER_DIFFERENT_BRAND", 400);
                    }

                    // Check cycle: cannot move folder into any of its own descendants
                    const wouldCreateCycle = await this.foldersRepository.isDescendant(id, newParentId);
                    if (wouldCreateCycle) {
                        throw new AppError("Cannot move a folder into one of its subfolders", "FOLDER_CYCLE_DETECTED", 400);
                    }
                }
            }

            const targetName = data.name !== undefined ? data.name.trim() : existing.name;

            // If name or parentId changed, verify uniqueness
            if (targetName !== existing.name || newParentId !== existing.parentId) {
                const duplicate = await this.foldersRepository.findByNameAndParent(targetName, existing.brandId, newParentId);
                if (duplicate && duplicate.id !== id) {
                    throw new AppError("A folder with this name already exists in the destination", "FOLDER_NAME_TAKEN", 400);
                }
            }

            const updated = await this.foldersRepository.update(id, {
                name: data.name !== undefined ? targetName : undefined,
                description: data.description !== undefined ? (data.description ? data.description.trim() : null) : undefined,
                parentId: data.parentId !== undefined ? newParentId : undefined
            });

            await this.auditLogService.record({
                userId: context?.userId,
                action: 'UPDATE',
                resource: 'folder',
                resourceId: updated.id,
                context,
                before: {
                    name: existing.name,
                    description: existing.description,
                    parentId: existing.parentId
                },
                after: {
                    name: updated.name,
                    description: updated.description,
                    parentId: updated.parentId
                }
            });

            return updated;

        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new AppError("A folder with this name already exists in the destination", "FOLDER_NAME_TAKEN", 400);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error updating folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
