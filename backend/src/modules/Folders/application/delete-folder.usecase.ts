import type { FoldersRepository } from "../domain/folders.repository.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";

export class DeleteFolderUseCase {
    constructor(
        private readonly foldersRepository: FoldersRepository,
        private readonly auditLogService: AuditLogService
    ) {}

    async execute(id: string, context?: AuditContext): Promise<void> {
        try {
            const existing = await this.foldersRepository.findById(id);
            if (!existing) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }

            await this.foldersRepository.delete(id);

            await this.auditLogService.record({
                userId: context?.userId,
                action: 'DELETE',
                resource: 'folder',
                resourceId: id,
                context,
                details: {
                    deleted: {
                        id: existing.id,
                        name: existing.name,
                        brandId: existing.brandId,
                        parentId: existing.parentId,
                        description: existing.description
                    }
                }
            });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}

