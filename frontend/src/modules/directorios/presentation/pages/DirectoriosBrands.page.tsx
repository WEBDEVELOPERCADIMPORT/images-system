import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    CircularProgress,
} from '@mui/material';
import { Business, Folder, ArrowForward } from '@mui/icons-material';
import { PageHeader } from '../../../../shared/components/common/PageHeader';
import { GoogleSearchBar } from '../../../../shared/components/common/GoogleSearchBar';
import { getAllBrands } from '../../../brands/infrastructure/services/brands.service';
import type { BrandDto } from '../../../brands/domain/dto/brands.dto';

export const DirectoriosBrandsPage: React.FC = () => {
    const navigate = useNavigate();

    const [brands, setBrands] = useState<BrandDto[]>([]);
    const [filteredBrands, setFilteredBrands] = useState<BrandDto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            setLoading(true);
            try {
                const data = await getAllBrands();
                setBrands(data);
                setFilteredBrands(data);
            } catch (err) {
                console.error('Error fetching brands for directory browser', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredBrands(brands);
        } else {
            const query = term.toLowerCase();
            setFilteredBrands(
                brands.filter(
                    (b) =>
                        b.name.toLowerCase().includes(query) ||
                        (b.description && b.description.toLowerCase().includes(query))
                )
            );
        }
    };

    return (
        <Box sx={{ width: '100%', py: 1 }}>
            <PageHeader
                title="Directories"
                subtitle="Select a brand to explore, create, and organize its folder structure"
            />

            <GoogleSearchBar
                value={searchTerm}
                onChange={handleSearch}
                onSubmit={(e) => e.preventDefault()}
                placeholder="Filter brands by name or description..."
                maxWidth={480}
            />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : filteredBrands.length === 0 ? (
                <Box
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: '16px',
                        border: '0.5px dashed',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    <Business sx={{ fontSize: 48, color: 'text.secondary', mb: 1, opacity: 0.5 }} />
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: '15px' }}>
                        No brands found
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: 2.5,
                    }}
                >
                    {filteredBrands.map((brand) => (
                        <Card
                            key={brand.id}
                            elevation={0}
                            sx={{
                                borderRadius: '16px',
                                border: '0.5px solid',
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                    transform: 'translateY(-2px)',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                    <Box
                                        sx={{
                                            p: 1.2,
                                            borderRadius: '10px',
                                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                                            color: 'primary.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Business sx={{ fontSize: 24 }} />
                                    </Box>
                                    <Box sx={{ minWidth: 0, flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {brand.name}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '13px',
                                        mb: 2,
                                        flex: 1,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {brand.description || 'No description provided.'}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <Chip
                                        icon={<Folder sx={{ fontSize: 16 }} />}
                                        size="small"
                                        label={`${brand._count?.folders ?? 0} folders`}
                                        sx={{ fontSize: '11px', fontWeight: 500 }}
                                    />
                                </Stack>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                    onClick={() => navigate(`/directorios?brandId=${brand.id}`)}
                                    sx={{
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: '13px',
                                    }}
                                >
                                    Explore Folders
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default DirectoriosBrandsPage;
