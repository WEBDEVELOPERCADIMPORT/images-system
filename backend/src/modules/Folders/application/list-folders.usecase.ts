import type { FoldersRepository } from "../domain/folders.repository.js";
import type { GetFolder } from "../domain/folder.entity.js";
import AppError from "@shared/errors/AppError.js";

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

export class ListFoldersUseCase {
    constructor(private readonly foldersRepository: FoldersRepository) {}

    async execute(params?: ListFoldersParams): Promise<ListFoldersResult | GetFolder[]> {
        try {
            if (params?.all && params.brandId) {
                return await this.foldersRepository.findAllByBrandAndParent(
                    params.brandId,
                    params.parentId === undefined ? null : params.parentId
                );
            }

            const page = params?.page && params.page > 0 ? Number(params.page) : 1;
            const limit = params?.limit && params.limit > 0 ? Number(params.limit) : 10;
            return await this.foldersRepository.findAllPaginated(page, limit, {
                brandId: params?.brandId,
                parentId: params?.parentId,
                q: params?.q
            });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching folders", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
