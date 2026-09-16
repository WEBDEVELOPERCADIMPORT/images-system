import type { Brand as PrismaBrand } from "@prisma/client";
import type { GetBrand } from "../../domain/brand.entity.js";
type PrismaBrandWithCount = PrismaBrand & {
    _count?: {
        folders?: number;
        images?: number;
    };
};
export declare class BrandsMapper {
    static toDomain(prismaBrand: PrismaBrandWithCount): GetBrand;
}
export {};
//# sourceMappingURL=brands.mapper.d.ts.map