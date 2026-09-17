export interface BrandDto {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: {
        folders: number;
        images: number;
        assets?: number;
    };
}

export interface CreateBrandDto {
    name: string;
    description?: string | null;
}

export interface UpdateBrandDto {
    name?: string;
    description?: string | null;
}

export interface BrandStatsDto {
    totalBrands: number;
    totalFolders: number;
    totalImages: number;
    totalAssets?: number;
}
