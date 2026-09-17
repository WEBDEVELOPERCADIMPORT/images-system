import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    CircularProgress,
    Button,
} from '@mui/material';
import { Business, Folder, Image, ArrowForward, PermMedia } from '@mui/icons-material';
import { PageHeader } from '../components/common/PageHeader';
import { ListTableSimple, type Column } from '../components/tables/ListTableSimple';
import { getBrandStats, getAllBrands } from '../../modules/brands/infrastructure/services/brands.service';
import type { BrandDto, BrandStatsDto } from '../../modules/brands/domain/dto/brands.dto';

export const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState<BrandStatsDto>({
        totalBrands: 0,
        totalFolders: 0,
        totalImages: 0,
        totalAssets: 0,
    });
    const [recentBrands, setRecentBrands] = useState<BrandDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                const [statsData, brandsData] = await Promise.all([
                    getBrandStats(),
                    getAllBrands(),
                ]);
                setStats(statsData);
                setRecentBrands(brandsData.slice(0, 5));
            } catch (err) {
                console.error('Error loading dashboard data', err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const columns: Column[] = [
        {
            id: 'name',
            name: 'Brand',
            format: (value: string) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '13px', color: 'text.primary' }}>
                        {value}
                    </Typography>
                </Box>
            ),
        },
        {
            id: 'description',
            name: 'Description',
            format: (value: string | null) => (
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                    {value || '—'}
                </Typography>
            ),
        },
        {
            id: 'folders',
            name: 'Directories',
            format: (_: any, row: BrandDto) => (
                <Typography sx={{ fontSize: '13px', color: 'text.primary', fontWeight: 500 }}>
                    {row._count?.folders ?? 0}
                </Typography>
            ),
        },
        {
            id: 'images',
            name: 'Images',
            format: (_: any, row: BrandDto) => (
                <Typography sx={{ fontSize: '13px', color: 'text.primary', fontWeight: 500 }}>
                    {row._count?.images ?? 0}
                </Typography>
            ),
        },
        {
            id: 'createdAt',
            name: 'Created Date',
            format: (value: string) => (
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                    {new Date(value).toLocaleDateString()}
                </Typography>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', py: 1 }}>
            <PageHeader
                title="Dashboard"
                subtitle="System overview, brands and directories status"
            />

            {/* Metric KPI Cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 2.5,
                    mb: 4,
                }}
            >
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: '16px',
                        border: '0.5px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        p: 1,
                    }}
                >
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Total Brands
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: 'text.primary' }}>
                                    {loading ? <CircularProgress size={24} /> : stats.totalBrands}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <Business sx={{ fontSize: 28 }} />
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: '16px',
                        border: '0.5px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        p: 1,
                    }}
                >
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Total Folders
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: 'text.primary' }}>
                                    {loading ? <CircularProgress size={24} /> : stats.totalFolders}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <Folder sx={{ fontSize: 28 }} />
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: '16px',
                        border: '0.5px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        p: 1,
                    }}
                >
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Total Images
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: 'text.primary' }}>
                                    {loading ? <CircularProgress size={24} /> : stats.totalImages}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                <Image sx={{ fontSize: 28 }} />
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: '16px',
                        border: '0.5px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        p: 1,
                    }}
                >
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Total Assets
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: 'text.primary' }}>
                                    {loading ? <CircularProgress size={24} /> : (stats.totalAssets ?? stats.totalImages)}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                                <PermMedia sx={{ fontSize: 28 }} />
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>

            {/* Recent Brands Section */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', color: 'text.primary' }}>
                        Recent Brands
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>
                        Overview of the latest brands added to the catalog
                    </Typography>
                </Box>
                <Button
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/brands')}
                    sx={{ textTransform: 'none', fontWeight: 500, fontSize: '13px' }}
                >
                    View all brands
                </Button>
            </Box>

            <ListTableSimple
                columns={columns}
                data={recentBrands}
            />
        </Box>
    );
};

export default DashboardPage;
