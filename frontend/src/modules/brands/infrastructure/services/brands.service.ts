import { api } from '../../../../core/api/axios.instance';
import type { BrandDto, CreateBrandDto, UpdateBrandDto, BrandStatsDto } from '../../domain/dto/brands.dto';

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    meta?: {
        total: number;
        limit: number;
        offset: number;
    };
}

export interface PaginatedBrandsResponse {
    data: BrandDto[];
    total: number;
    limit: number;
    offset: number;
}

export const getBrandsPaginated = async (
    page: number = 1,
    limit: number = 10,
    q?: string
): Promise<PaginatedBrandsResponse> => {
    const params: Record<string, any> = { page, limit };
    if (q) params.q = q;

    const response = await api.get<ApiResponse<BrandDto[]>>('/brands', { params });
    return {
        data: response.data.data,
        total: response.data.meta?.total ?? response.data.data.length,
        limit: response.data.meta?.limit ?? limit,
        offset: response.data.meta?.offset ?? (page - 1) * limit,
    };
};

export const getAllBrands = async (): Promise<BrandDto[]> => {
    const response = await api.get<ApiResponse<BrandDto[]>>('/brands', {
        params: { all: true },
    });
    return response.data.data;
};

export const getBrandById = async (id: string): Promise<BrandDto> => {
    const response = await api.get<ApiResponse<BrandDto>>(`/brands/${id}`);
    return response.data.data;
};

export const getBrandStats = async (): Promise<BrandStatsDto> => {
    const response = await api.get<ApiResponse<BrandStatsDto>>('/brands/stats');
    return response.data.data;
};

export const createBrand = async (data: CreateBrandDto): Promise<BrandDto> => {
    const response = await api.post<ApiResponse<BrandDto>>('/brands', data);
    return response.data.data;
};

export const updateBrand = async (id: string, data: UpdateBrandDto): Promise<BrandDto> => {
    const response = await api.put<ApiResponse<BrandDto>>(`/brands/${id}`, data);
    return response.data.data;
};

export const deleteBrand = async (id: string): Promise<void> => {
    await api.delete(`/brands/${id}`);
};
