export interface Folder {
    id: string;
    name: string;
    description: string | null;
    brandId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateFolder {
    name: string;
    description?: string | null;
    brandId: string;
    parentId?: string | null;
}

export interface UpdateFolder {
    name?: string;
    description?: string | null;
    parentId?: string | null;
}

export interface FolderCounts {
    children: number;
    images: number;
    assets?: number;
}

export interface GetFolder {
    id: string;
    name: string;
    description: string | null;
    brandId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    brand?: {
        id: string;
        name: string;
    };
    parent?: {
        id: string;
        name: string;
    } | null;
    _count?: FolderCounts;
}
