import type { FoldersRepository } from "../domain/folders.repository.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
import AppError from "@shared/errors/AppError.js";

export class DeleteFolderUseCase {
    constructor(
        private readonly foldersRepository: FoldersRepository,
        private readonly createAuditLogUseCase: CreateAuditLogUseCase
    ) {}

    async execute(id: string, userId?: string | null): Promise<void> {
        try {
            const existing = await this.foldersRepository.findById(id);
            if (!existing) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }

            await this.foldersRepository.delete(id);

            await this.createAuditLogUseCase.execute({
                userId,
                action: 'DELETE',
                resource: 'FOLDER',
                resourceId: id,
                details: { name: existing.name, brandId: existing.brandId }
            }).catch(err => console.error("Failed to create audit log for folder delete", err));
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
