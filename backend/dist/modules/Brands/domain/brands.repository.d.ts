import type { CreateBrand, UpdateBrand, GetBrand } from "./brand.entity.js";
export interface BrandsRepository {
    create(data: CreateBrand): Promise<GetBrand>;
    update(id: string, data: UpdateBrand): Promise<GetBrand>;
    findById(id: string): Promise<GetBrand | null>;
    findByName(name: string): Promise<GetBrand | null>;
    findAll(): Promise<GetBrand[]>;
    findAllPaginated(page: number, limit: number, filters?: {
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
//# sourceMappingURL=brands.repository.d.ts.map