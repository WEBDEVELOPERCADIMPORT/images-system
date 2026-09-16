import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Chip,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Add,
    Folder,
    FolderOpen,
    Edit,
    Delete,
    ArrowBack,
} from '@mui/icons-material';
import { PageHeader } from '../../../../shared/components/common/PageHeader';
import { GoogleSearchBar } from '../../../../shared/components/common/GoogleSearchBar';
import ListTable, { type Column, type Action } from '../../../../shared/components/tables/ListTable';
import ConfirmDialog from '../../../../shared/components/dialog/ConfirmDialog';
import FolderBreadcrumb from '../components/FolderBreadcrumb';
import FolderFormDialog from '../components/FolderFormDialog';
import {
    getFoldersPaginated,
    getFolderById,
    deleteFolder,
} from '../../infrastructure/services/folders.service';
import { getBrandById } from '../../../brands/infrastructure/services/brands.service';
import type { FolderDto, FolderBreadcrumbItem } from '../../domain/dto/folders.dto';
import type { BrandDto } from '../../../brands/domain/dto/brands.dto';

export const FoldersBrowserPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const brandId = searchParams.get('brandId');
    const parentId = searchParams.get('parentId') || null;

    const [brand, setBrand] = useState<BrandDto | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<FolderBreadcrumbItem[]>([]);
    const [folders, setFolders] = useState<FolderDto[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [q, setQ] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    // Dialogs state
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<FolderDto | null>(null);
    const [folderToDelete, setFolderToDelete] = useState<FolderDto | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Toast
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // 1. Fetch Brand info
    useEffect(() => {
        if (!brandId) return;
        getBrandById(brandId)
            .then(setBrand)
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: 'Failed to load brand details',
                    severity: 'error',
                });
            });
    }, [brandId]);

    // 2. Fetch breadcrumbs if inside a parent folder
    useEffect(() => {
        if (!parentId) {
            setBreadcrumbs([]);
            return;
        }

        getFolderById(parentId)
            .then((folder) => {
                setBreadcrumbs(folder.breadcrumbs || []);
            })
            .catch(() => {
                setBreadcrumbs([]);
            });
    }, [parentId]);

    // 3. Fetch folders in current level
    const fetchFolders = useCallback(async () => {
        if (!brandId) return;
        setLoading(true);
        try {
            const res = await getFoldersPaginated(brandId, parentId, page + 1, limit, q || undefined);
            setFolders(res.data);
            setTotal(res.total);
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to load directories',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [brandId, parentId, page, limit, q]);

    useEffect(() => {
        fetchFolders();
    }, [fetchFolders]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        setQ(searchInputValue);
    };

    const handleNavigate = (targetParentId: string | null) => {
        const nextParams = new URLSearchParams(searchParams);
        if (targetParentId) {
            nextParams.set('parentId', targetParentId);
        } else {
            nextParams.delete('parentId');
        }
        setSearchParams(nextParams);
        setPage(0);
        setQ('');
        setSearchInputValue('');
    };

    const handleOpenCreate = () => {
        setSelectedFolder(null);
        setFormDialogOpen(true);
    };

    const handleOpenEdit = (folder: FolderDto) => {
        setSelectedFolder(folder);
        setFormDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!folderToDelete) return;
        setIsDeleting(true);
        try {
            await deleteFolder(folderToDelete.id);
            setSnackbar({
                open: true,
                message: 'Directory deleted successfully',
                severity: 'success',
            });
            setFolderToDelete(null);
            fetchFolders();
        } catch (err: any) {
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to delete directory',
                severity: 'error',
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: Column[] = [
        {
            id: 'name',
            name: 'Folder Name',
            format: (value: string, row: FolderDto) => (
                <Box
                    onClick={() => handleNavigate(row.id)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    <Folder sx={{ fontSize: 20, color: 'primary.main' }} />
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
                <Typography noWrap sx={{ fontSize: '13px', color: 'text.secondary', maxWidth: 280 }}>
                    {value || '—'}
                </Typography>
            ),
        },
        {
            id: 'childrenCount',
            name: 'Subfolders',
            format: (_: any, row: FolderDto) => (
                <Chip
                    size="small"
                    label={`${row._count?.children ?? 0} folders`}
                    sx={{ fontSize: '11px', fontWeight: 500, bgcolor: 'action.hover' }}
                />
            ),
        },
        {
            id: 'imagesCount',
            name: 'Images',
            format: (_: any, row: FolderDto) => (
                <Chip
                    size="small"
                    label={`${row._count?.images ?? 0} files`}
                    sx={{ fontSize: '11px', fontWeight: 500, bgcolor: 'action.hover' }}
                />
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

    const actions: Action[] = [
        {
            name: 'Open Folder',
            icon: <FolderOpen fontSize="small" />,
            onClick: (row: FolderDto) => handleNavigate(row.id),
        },
        {
            name: 'Edit',
            icon: <Edit fontSize="small" />,
            onClick: (row: FolderDto) => handleOpenEdit(row),
        },
        {
            name: 'Delete',
            icon: <Delete fontSize="small" />,
            color: '#ef4444',
            onClick: (row: FolderDto) => setFolderToDelete(row),
        },
    ];

    if (!brandId) {
        return null;
    }

    return (
        <Box sx={{ width: '100%', py: 1 }}>
            <PageHeader
                title={brand ? `Directories — ${brand.name}` : 'Directories'}
                subtitle="Hierarchical folder explorer and media assets browser"
                actionLabel="New Folder"
                actionIcon={<Add />}
                onAction={handleOpenCreate}
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/directorios')}
                    sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        color: 'text.secondary',
                        borderColor: 'divider',
                    }}
                >
                    Switch Brand
                </Button>
            </PageHeader>

            {/* Breadcrumb Navigation */}
            <FolderBreadcrumb
                brandName={brand ? brand.name : 'Brand'}
                breadcrumbs={breadcrumbs}
                onNavigate={handleNavigate}
            />

            <GoogleSearchBar
                value={searchInputValue}
                onChange={(val) => {
                    setSearchInputValue(val);
                    if (!val && q) {
                        setPage(0);
                        setQ('');
                    }
                }}
                onSubmit={handleSearchSubmit}
                placeholder="Search folders at this level..."
                loading={loading}
            />

            <ListTable
                data={folders}
                columns={columns}
                actions={actions}
                emptyMessage="No subfolders found in this directory"
                pagination={{
                    total,
                    limit,
                    offset: page * limit,
                    onPageChange: (newPage) => setPage(newPage),
                    onRowsPerPageChange: (newLimit) => {
                        setLimit(newLimit);
                        setPage(0);
                    },
                }}
            />

            {/* Create / Edit Dialog */}
            <FolderFormDialog
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                onSuccess={() => {
                    setSnackbar({
                        open: true,
                        message: selectedFolder ? 'Directory updated successfully' : 'Directory created successfully',
                        severity: 'success',
                    });
                    fetchFolders();
                }}
                brandId={brandId}
                parentId={parentId}
                initialData={selectedFolder}
            />

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                open={Boolean(folderToDelete)}
                title="Delete Folder?"
                description={
                    <span>
                        Are you sure you want to delete folder <strong>{folderToDelete?.name}</strong>? All its subfolders will also be deleted.
                    </span>
                }
                onClose={() => setFolderToDelete(null)}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                confirmText="Delete"
                confirmColor="error"
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%', borderRadius: 2 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default FoldersBrowserPage;
