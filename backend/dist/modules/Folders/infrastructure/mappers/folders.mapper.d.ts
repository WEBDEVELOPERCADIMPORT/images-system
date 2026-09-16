import type { Folder as PrismaFolder } from "@prisma/client";
import type { GetFolder } from "../../domain/folder.entity.js";
type PrismaFolderFull = PrismaFolder & {
    brand?: {
        id: string;
        name: string;
    } | null;
    parent?: {
        id: string;
        name: string;
    } | null;
    _count?: {
        children?: number;
        images?: number;
    };
};
export declare class FoldersMapper {
    static toDomain(folder: PrismaFolderFull): GetFolder;
}
export {};
//# sourceMappingURL=folders.mapper.d.ts.map