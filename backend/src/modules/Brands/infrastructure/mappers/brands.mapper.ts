import type { Brand as PrismaBrand } from "@prisma/client";
import type { GetBrand } from "../../domain/brand.entity.js";

type PrismaBrandWithCount = PrismaBrand & {
    _count?: {
        folders?: number;
        images?: number;
    };
};

export class BrandsMapper {
    static toDomain(prismaBrand: PrismaBrandWithCount): GetBrand {
        return {
            id: prismaBrand.id,
            name: prismaBrand.name,
            description: prismaBrand.description,
            createdAt: prismaBrand.createdAt,
            updatedAt: prismaBrand.updatedAt,
            _count: prismaBrand._count ? {
                folders: prismaBrand._count.folders ?? 0,
                images: prismaBrand._count.images ?? 0,
            } : undefined
        };
    }
}
