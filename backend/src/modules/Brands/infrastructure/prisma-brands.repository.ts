import type { PrismaClient } from "@prisma/client";
import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateBrand, UpdateBrand, GetBrand } from "../domain/brand.entity.js";
import { PrismaErrorMapper } from "@shared/db/database/prisma/PrismaErrorMapper.js";
import { BrandsMapper } from "./mappers/brands.mapper.js";

export class PrismaBrandsRepository implements BrandsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(data: CreateBrand): Promise<GetBrand> {
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
                            assets: true
                        }
                    }
                }
            });
            return BrandsMapper.toDomain(brand);
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async update(id: string, data: UpdateBrand): Promise<GetBrand> {
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
                            assets: true
                        }
                    }
                }
            });
            return BrandsMapper.toDomain(brand);
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async findById(id: string): Promise<GetBrand | null> {
        try {
            const brand = await this.prisma.brand.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            assets: true
                        }
                    }
                }
            });
            return brand ? BrandsMapper.toDomain(brand) : null;
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async findByName(name: string): Promise<GetBrand | null> {
        try {
            const brand = await this.prisma.brand.findUnique({
                where: { name },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            assets: true
                        }
                    }
                }
            });
            return brand ? BrandsMapper.toDomain(brand) : null;
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async findAll(): Promise<GetBrand[]> {
        try {
            const brands = await this.prisma.brand.findMany({
                orderBy: { name: "asc" },
                include: {
                    _count: {
                        select: {
                            folders: true,
                            assets: true
                        }
                    }
                }
            });
            return brands.map(BrandsMapper.toDomain);
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async findAllPaginated(
        page: number = 1,
        limit: number = 10,
        filters?: { q?: string }
    ): Promise<{ data: GetBrand[]; total: number }> {
        try {
            const offset = (page - 1) * limit;
            const whereClause: any = {};
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
                                assets: true
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
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.brand.delete({
                where: { id }
            });
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }

    async getStats(): Promise<{ totalBrands: number; totalFolders: number; totalImages: number; totalAssets?: number }> {
        try {
            const [totalBrands, totalFolders, totalImages, totalAssets] = await Promise.all([
                this.prisma.brand.count(),
                this.prisma.folder.count(),
                this.prisma.asset.count({ where: { type: 'IMAGE' } }),
                this.prisma.asset.count()
            ]);
            return { totalBrands, totalFolders, totalImages, totalAssets };
        } catch (error) {
            throw PrismaErrorMapper.map(error);
        }
    }
}
