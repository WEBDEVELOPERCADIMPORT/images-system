import type { PrismaClient } from "@prisma/client";
import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateBrand, UpdateBrand, GetBrand } from "../domain/brand.entity.js";
export declare class PrismaBrandsRepository implements BrandsRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: CreateBrand): Promise<GetBrand>;
    update(id: string, data: UpdateBrand): Promise<GetBrand>;
    findById(id: string): Promise<GetBrand | null>;
    findByName(name: string): Promise<GetBrand | null>;
    findAll(): Promise<GetBrand[]>;
    findAllPaginated(page?: number, limit?: number, filters?: {
        q?: string;
    }): Promise<{
        data: GetBrand[];
        total: number;
    }>;
    delete(id: string): Promise<void>;
    getStats(): Promise<{
        totalBrands: number;
        totalFolders: number;
        totalImages: number;
    }>;
}
//# sourceMappingURL=prisma-brands.repository.d.ts.map