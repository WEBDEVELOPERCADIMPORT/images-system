import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Folder, Business, ChevronRight } from '@mui/icons-material';
import type { FolderBreadcrumbItem } from '../../domain/dto/folders.dto';

interface FolderBreadcrumbProps {
    brandName: string;
    breadcrumbs: FolderBreadcrumbItem[];
    onNavigate: (folderId: string | null) => void;
}

export const FolderBreadcrumb: React.FC<FolderBreadcrumbProps> = ({
    brandName,
    breadcrumbs,
    onNavigate,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                px: 2,
                mb: 3,
                borderRadius: '12px',
                border: '0.5px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Breadcrumbs
                separator={<ChevronRight sx={{ fontSize: 16, color: 'text.secondary' }} />}
                aria-label="folder navigation breadcrumb"
            >
                {/* Brand Root */}
                <Link
                    component="button"
                    underline="hover"
                    onClick={() => onNavigate(null)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '13px',
                        fontWeight: breadcrumbs.length === 0 ? 600 : 500,
                        color: breadcrumbs.length === 0 ? 'text.primary' : 'primary.main',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        p: 0,
                    }}
                >
                    <Business sx={{ fontSize: 16 }} />
                    {brandName}
                </Link>

                {/* Intermediate Folders */}
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    if (isLast) {
                        return (
                            <Typography
                                key={crumb.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                }}
                            >
                                <Folder sx={{ fontSize: 16, color: 'primary.main' }} />
                                {crumb.name}
                            </Typography>
                        );
                    }

                    return (
                        <Link
                            key={crumb.id}
                            component="button"
                            underline="hover"
                            onClick={() => onNavigate(crumb.id)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'primary.main',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'none',
                                p: 0,
                            }}
                        >
                            <Folder sx={{ fontSize: 16 }} />
                            {crumb.name}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
};

export default FolderBreadcrumb;
