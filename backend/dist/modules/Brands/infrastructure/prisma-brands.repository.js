import { PrismaErrorMapper } from "../../../shared/db/database/prisma/PrismaErrorMapper.js";
import { BrandsMapper } from "./mappers/brands.mapper.js";
export class PrismaBrandsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const brand = await this.prisma.brand.create({
                data: {
                    name: data.name,
                    description: data.description ?? null
                },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            images: true
                        }
                    }
                }
            });
            return BrandsMapper.toDomain(brand);
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async update(id, data) {
        try {
            const brand = await this.prisma.brand.update({
                where: { id },
                data: {
                    ...(data.name !== undefined && { name: data.name }),
                    ...(data.description !== undefined && { description: data.description })
                },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            images: true
                        }
                    }
                }
            });
            return BrandsMapper.toDomain(brand);
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async findById(id) {
        try {
            const brand = await this.prisma.brand.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            images: true
                        }
                    }
                }
            });
            return brand ? BrandsMapper.toDomain(brand) : null;
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async findByName(name) {
        try {
            const brand = await this.prisma.brand.findUnique({
                where: { name },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            images: true
                        }
                    }
                }
            });
            return brand ? BrandsMapper.toDomain(brand) : null;
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async findAll() {
        try {
            const brands = await this.prisma.brand.findMany({
                orderBy: { name: "asc" },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            images: true
                        }
                    }
                }
            });
            return brands.map(BrandsMapper.toDomain);
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async findAllPaginated(page = 1, limit = 10, filters) {
        try {
            const offset = (page - 1) * limit;
            const whereClause = {};
            if (filters?.q) {
                const query = filters.q.trim();
                whereClause.OR = [
                    { name: { contains: query } },
                    { description: { contains: query } }
                ];
            }
            const [brands, total] = await Promise.all([
                this.prisma.brand.findMany({
                    where: whereClause,
                    skip: offset,
                    take: limit,
                    orderBy: { createdAt: "desc" },
                    include: {
                        _count: {
                            select: {
                                folders: true,
                                images: true
                            }
                        }
                    }
                }),
                this.prisma.brand.count({ where: whereClause })
            ]);
            return {
                data: brands.map(BrandsMapper.toDomain),
                total
            };
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async delete(id) {
        try {
            await this.prisma.brand.delete({
                where: { id }
            });
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
    async getStats() {
        try {
            const [totalBrands, totalFolders, totalImages] = await Promise.all([
                this.prisma.brand.count(),
                this.prisma.folder.count(),
                this.prisma.image.count()
            ]);
            return { totalBrands, totalFolders, totalImages };
        }
        catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
}
//# sourceMappingURL=prisma-brands.repository.js.map