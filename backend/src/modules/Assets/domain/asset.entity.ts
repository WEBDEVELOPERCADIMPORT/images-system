import type { AssetType } from "@prisma/client";

export type { AssetType };

export interface AssetEntity {
    id: string;
    name: string;
    description: string | null;
    url: string;
    sku: string | null;
    type: AssetType;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    extension: string | null;
    metadata: any;
    brandId: string;
    folderId: string | null;
    createdAt: Date;
    updatedAt: Date;
    brand?: {
        id: string;
        name: string;
    };
    folder?: {
        id: string;
        name: string;
    } | null;
}

export interface CreateAssetRepoInput {
    id?: string;
    name: string;
    description?: string | null;
    url: string;
    sku?: string | null;
    type: AssetType;
    fileName: string;
    mimeType: string;
    sizeBytes: bigint;
    extension?: string | null;
    metadata?: any;
    brandId: string;
    folderId?: string | null;
}

export interface UpdateAssetRepoInput {
    name?: string;
    description?: string | null;
    sku?: string | null;
    url?: string;
    type?: AssetType;
    fileName?: string;
    mimeType?: string;
    sizeBytes?: bigint;
    extension?: string | null;
    metadata?: any;
    folderId?: string | null;
    brandId?: string;
}

export interface CreateAssetInput {
    name: string;
    description?: string | null;
    sku?: string | null;
    brandId: string;
    folderId?: string | null;
    file: {
        buffer: Buffer;
        originalname: string;
        mimetype: string;
        size: number;
    };
}

export interface UpdateAssetInput {
    name?: string;
    description?: string | null;
    sku?: string | null;
    brandId?: string;
    folderId?: string | null;
    file?: {
        buffer: Buffer;
        originalname: string;
        mimetype: string;
        size: number;
    } | null;
}

export interface ListAssetsFilters {
    brandId?: string;
    folderId?: string | null;
    type?: AssetType;
    sku?: string;
    q?: string;
}
