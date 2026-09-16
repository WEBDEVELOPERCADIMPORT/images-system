export interface Brand {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBrand {
    name: string;
    description?: string | null;
}

export interface UpdateBrand {
    name?: string;
    description?: string | null;
}

export interface BrandCounts {
    folders: number;
    images: number;
}

export interface GetBrand {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count?: BrandCounts;
}
