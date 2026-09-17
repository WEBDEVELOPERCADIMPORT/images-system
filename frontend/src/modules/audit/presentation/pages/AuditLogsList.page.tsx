import React, { useEffect, useState, useCallback } from 'react';
import {
    Box,
    Chip,
    Typography,
    Snackbar,
    Alert,
    Avatar,
    MenuItem,
    TextField,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Tooltip,
} from '@mui/material';
import {
    VisibilityOutlined,
    FilterAltOff,
    Security,
    Person,
    Business,
    Folder,
    Storage,
    Refresh,
} from '@mui/icons-material';
import { PageHeader } from '../../../../shared/components/common/PageHeader';
import { GoogleSearchBar } from '../../../../shared/components/common/GoogleSearchBar';
import ListTable, { type Column, type Action } from '../../../../shared/components/tables/ListTable';
import { AuditLogDetailDialog } from '../components/AuditLogDetailDialog';
import { getAuditLogsPaginated } from '../../infrastructure/services/audit.service';
import type { AuditLogItem, AuditAction, AuditFilters } from '../../domain/audit.entity';

const getActionChip = (action: AuditAction) => {
    switch (action) {
        case 'CREATE':
            return (
                <Chip
                    label="CREATE"
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        backgroundColor: '#ecfdf5',
                        color: '#047857',
                        border: '1px solid #a7f3d0',
                    }}
                />
            );
        case 'UPDATE':
            return (
                <Chip
                    label="UPDATE"
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        border: '1px solid #bfdbfe',
                    }}
                />
            );
        case 'DELETE':
            return (
                <Chip
                    label="DELETE"
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        backgroundColor: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                    }}
                />
            );
        case 'LOGIN':
            return (
                <Chip
                    label="LOGIN"
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        backgroundColor: '#f5f3ff',
                        color: '#6d28d9',
                        border: '1px solid #ddd6fe',
                    }}
                />
            );
        case 'LOGOUT':
            return (
                <Chip
                    label="LOGOUT"
                    size="small"
                    sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        backgroundColor: '#fffbeb',
                        color: '#b45309',
                        border: '1px solid #fde68a',
                    }}
                />
            );
        default:
            return <Chip label={action} size="small" />;
    }
};

const getResourceIcon = (resource: string) => {
    switch (resource.toLowerCase()) {
        case 'auth':
            return <Security fontSize="small" sx={{ color: '#6366f1' }} />;
        case 'user':
            return <Person fontSize="small" sx={{ color: '#0284c7' }} />;
        case 'brand':
            return <Business fontSize="small" sx={{ color: '#059669' }} />;
        case 'folder':
            return <Folder fontSize="small" sx={{ color: '#d97706' }} />;
        case 'asset':
            return <Storage fontSize="small" sx={{ color: '#7c3aed' }} />;
        default:
            return <Storage fontSize="small" sx={{ color: '#64748b' }} />;
    }
};

export const AuditLogsListPage: React.FC = () => {
    const [logs, setLogs] = useState<AuditLogItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    // Filters
    const [searchInputValue, setSearchInputValue] = useState('');
    const [q, setQ] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const [resourceFilter, setResourceFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Detail Dialog State
    const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    // Feedback Toast
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const filters: AuditFilters = {};
            if (q) filters.q = q;
            if (actionFilter) filters.action = actionFilter;
            if (resourceFilter) filters.resource = resourceFilter;
            if (dateFrom) filters.dateFrom = dateFrom;
            if (dateTo) filters.dateTo = dateTo;

            const res = await getAuditLogsPaginated(page + 1, limit, filters);
            setLogs(res.data);
            setTotal(res.total);
        } catch {
            setSnackbar({
                open: true,
                message: 'Error al cargar los registros de auditoría',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [page, limit, q, actionFilter, resourceFilter, dateFrom, dateTo]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        setQ(searchInputValue);
    };

    const handleClearFilters = () => {
        setSearchInputValue('');
        setQ('');
        setActionFilter('');
        setResourceFilter('');
        setDateFrom('');
        setDateTo('');
        setPage(0);
    };

    const handleOpenDetail = (log: AuditLogItem) => {
        setSelectedLog(log);
        setDetailDialogOpen(true);
    };

    const columns: Column[] = [
        {
            id: 'createdAt',
            name: 'Fecha y Hora',
            format: (value: string) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                        {new Date(value).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </Typography>
                </Box>
            ),
        },
        {
            id: 'action',
            name: 'Acción',
            format: (value: AuditAction) => getActionChip(value),
        },
        {
            id: 'resource',
            name: 'Recurso',
            format: (value: string, row: AuditLogItem) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getResourceIcon(value)}
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#1e293b' }}>
                            {value}
                        </Typography>
                        {row.resourceId && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#64748b',
                                    fontFamily: 'monospace',
                                    display: 'block',
                                    maxWidth: 140,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                                title={row.resourceId}
                            >
                                {row.resourceId}
                            </Typography>
                        )}
                    </Box>
                </Box>
            ),
        },
        {
            id: 'user',
            name: 'Usuario',
            format: (_: any, row: AuditLogItem) => {
                if (!row.user) {
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 28, height: 28, bgcolor: '#94a3b8', fontSize: '0.75rem' }}>S</Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ color: '#64748b', fontStyle: 'italic' }}>
                                    Sistema / Anónimo
                                </Typography>
                            </Box>
                        </Box>
                    );
                }

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            src={row.user.avatarUrl || undefined}
                            sx={{ width: 32, height: 32, bgcolor: '#2563eb', fontSize: '0.8rem', fontWeight: 600 }}
                        >
                            {row.user.firstName?.[0]}
                            {row.user.lastName?.[0]}
                        </Avatar>
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                {row.user.firstName} {row.user.lastName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {row.user.email}
                            </Typography>
                        </Box>
                    </Box>
                );
            },
        },
        {
            id: 'details',
            name: 'Resumen',
            format: (details: any, row: AuditLogItem) => {
                if (!details) return <Typography variant="caption" sx={{ color: '#94a3b8' }}>-</Typography>;

                let summary = '';
                if (row.action === 'LOGIN') {
                    summary = `Login exitoso (${details.loginMethod || 'password'})`;
                } else if (row.action === 'LOGOUT') {
                    summary = `Cierre de sesión`;
                } else if (row.action === 'CREATE') {
                    summary = details.name ? `Creado: "${details.name}"` : (details.email ? `Creado: ${details.email}` : 'Registro creado');
                } else if (row.action === 'UPDATE') {
                    if (details.changes) {
                        const fields = Object.keys(details.changes);
                        summary = `Modificado: ${fields.slice(0, 3).join(', ')}${fields.length > 3 ? ` (+${fields.length - 3})` : ''}`;
                    } else if (details.fileReplaced) {
                        summary = `Archivo físico reemplazado`;
                    } else {
                        summary = 'Registro actualizado';
                    }
                } else if (row.action === 'DELETE') {
                    summary = details.deleted?.name ? `Eliminado: "${details.deleted.name}"` : 'Registro eliminado';
                }

                return (
                    <Box>
                        <Typography variant="body2" sx={{ color: '#334155', fontWeight: 500 }}>
                            {summary}
                        </Typography>
                        {details.ip && (
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
                                IP: {details.ip}
                            </Typography>
                        )}
                    </Box>
                );
            },
        },
    ];

    const actions: Action[] = [
        {
            name: 'Ver Detalle',
            icon: <VisibilityOutlined fontSize="small" sx={{ color: '#0284c7' }} />,
            onClick: (row: AuditLogItem) => handleOpenDetail(row),
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <PageHeader
                title="Audit Logs"
                subtitle="Trazabilidad transversal de eventos, operaciones y cambios realizados en el sistema"
            >
                <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={fetchLogs}
                    disabled={loading}
                    sx={{ textTransform: 'none', borderRadius: '10px' }}
                >
                    Refrescar
                </Button>
            </PageHeader>

            {/* Filter Bar */}
            <Card variant="outlined" sx={{ mb: 3, borderRadius: 2, borderColor: '#e2e8f0' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <GoogleSearchBar
                            value={searchInputValue}
                            onChange={(val) => setSearchInputValue(val)}
                            onSubmit={handleSearchSubmit}
                            placeholder="Buscar por recurso, ID, email o usuario..."
                            maxWidth="100%"
                        />

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, alignItems: { md: 'center' } }}>
                            {/* Action Filter */}
                            <TextField
                                select
                                size="small"
                                label="Acción"
                                value={actionFilter}
                                onChange={(e) => {
                                    setActionFilter(e.target.value);
                                    setPage(0);
                                }}
                                sx={{ minWidth: 140 }}
                            >
                                <MenuItem value="">Todas las acciones</MenuItem>
                                <MenuItem value="LOGIN">LOGIN</MenuItem>
                                <MenuItem value="LOGOUT">LOGOUT</MenuItem>
                                <MenuItem value="CREATE">CREATE</MenuItem>
                                <MenuItem value="UPDATE">UPDATE</MenuItem>
                                <MenuItem value="DELETE">DELETE</MenuItem>
                            </TextField>

                            {/* Resource Filter */}
                            <TextField
                                select
                                size="small"
                                label="Recurso"
                                value={resourceFilter}
                                onChange={(e) => {
                                    setResourceFilter(e.target.value);
                                    setPage(0);
                                }}
                                sx={{ minWidth: 140 }}
                            >
                                <MenuItem value="">Todos los recursos</MenuItem>
                                <MenuItem value="auth">Auth</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="brand">Brand</MenuItem>
                                <MenuItem value="folder">Folder</MenuItem>
                                <MenuItem value="asset">Asset</MenuItem>
                            </TextField>

                            {/* Date Range */}
                            <TextField
                                size="small"
                                type="date"
                                label="Desde"
                                slotProps={{ inputLabel: { shrink: true } }}
                                value={dateFrom}
                                onChange={(e) => {
                                    setDateFrom(e.target.value);
                                    setPage(0);
                                }}
                                sx={{ minWidth: 140 }}
                            />

                            <TextField
                                size="small"
                                type="date"
                                label="Hasta"
                                slotProps={{ inputLabel: { shrink: true } }}
                                value={dateTo}
                                onChange={(e) => {
                                    setDateTo(e.target.value);
                                    setPage(0);
                                }}
                                sx={{ minWidth: 140 }}
                            />

                            {(q || actionFilter || resourceFilter || dateFrom || dateTo) && (
                                <Tooltip title="Limpiar todos los filtros">
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        startIcon={<FilterAltOff />}
                                        onClick={handleClearFilters}
                                        sx={{ textTransform: 'none', color: '#64748b' }}
                                    >
                                        Limpiar
                                    </Button>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Content Table */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                    <CircularProgress size={40} />
                </Box>
            ) : (
                <ListTable
                    data={logs}
                    columns={columns}
                    actions={actions}
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
                    emptyMessage="No se encontraron registros de auditoría que coincidan con la búsqueda."
                />
            )}

            {/* Detail Dialog */}
            <AuditLogDetailDialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                log={selectedLog}
            />

            {/* Toast Feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AuditLogsListPage;
