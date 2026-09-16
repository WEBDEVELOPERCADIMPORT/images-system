export class BrandsMapper {
    static toDomain(prismaBrand) {
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
//# sourceMappingURL=brands.mapper.js.map