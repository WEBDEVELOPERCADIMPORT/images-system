import type { Folder as PrismaFolder } from "@prisma/client";
import type { GetFolder } from "../../domain/folder.entity.js";

type PrismaFolderFull = PrismaFolder & {
    brand?: { id: string; name: string } | null;
    parent?: { id: string; name: string } | null;
    _count?: {
        children?: number;
        images?: number;
    };
};

export class FoldersMapper {
    static toDomain(folder: PrismaFolderFull): GetFolder {
        return {
            id: folder.id,
            name: folder.name,
            description: folder.description,
            brandId: folder.brandId,
            parentId: folder.parentId,
            createdAt: folder.createdAt,
            updatedAt: folder.updatedAt,
            brand: folder.brand ? {
                id: folder.brand.id,
                name: folder.brand.name
            } : undefined,
            parent: folder.parent ? {
                id: folder.parent.id,
                name: folder.parent.name
            } : folder.parentId === null ? null : undefined,
            _count: folder._count ? {
                children: folder._count.children ?? 0,
                images: folder._count.images ?? 0
            } : undefined
        };
    }
}
