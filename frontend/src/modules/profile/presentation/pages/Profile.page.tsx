import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Stack,
    Divider,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import {
    PersonOutlined,
    VerifiedUserOutlined,
} from '@mui/icons-material';
import { PageHeader } from '../../../../shared/components/common/PageHeader';
import { useAuthStore } from '../../../../core/store/authStore';
import { getCurrentUser } from '../../../auth/infrastructure/services/auth.service';
import type { AuthUser } from '../../../auth/domain/interfaces/auth.interfaces';

export const ProfilePage: React.FC = () => {
    const { user: cachedUser, accessToken, setUser } = useAuthStore();
    const [profile, setProfile] = useState<AuthUser | null>(cachedUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) return;

        const loadProfile = async () => {
            setLoading(true);
            try {
                const freshUser = await getCurrentUser(accessToken);
                setProfile(freshUser);
                setUser(freshUser);
            } catch {
                setError('Failed to refresh profile information');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [accessToken, setUser]);

    const displayUser = profile || cachedUser;

    const initials = displayUser?.name
        ? displayUser.name
              .split(' ')
              .slice(0, 2)
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
        : 'U';

    const rolesList = displayUser?.roles || (displayUser?.role ? [displayUser.role] : ['USER']);

    return (
        <Box sx={{ width: '100%', py: 1 }}>
            <PageHeader
                title="My Profile"
                subtitle="View your account credentials, security privileges, and assigned roles"
            />

            {error && (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {loading && !displayUser ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
                    {/* User Identity Card */}
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: '16px',
                            border: '0.5px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            p: 2,
                            textAlign: 'center',
                        }}
                    >
                        <CardContent>
                            <Avatar
                                sx={{
                                    width: 88,
                                    height: 88,
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: '#006bff',
                                    color: '#ffffff',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    boxShadow: '0 8px 24px rgba(0, 107, 255, 0.25)',
                                }}
                            >
                                {initials}
                            </Avatar>

                            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                                {displayUser?.name || 'Authenticated User'}
                            </Typography>

                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                {displayUser?.email}
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mb: 2.5, justifyContent: 'center' }}>
                                {rolesList.map((r) => (
                                    <Chip
                                        key={r}
                                        label={r}
                                        color="primary"
                                        size="small"
                                        sx={{ fontWeight: 600, fontSize: '11px' }}
                                    />
                                ))}
                                <Chip
                                    label="Active"
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: 600, fontSize: '11px' }}
                                />
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                                    Account ID
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', wordBreak: 'break-all', fontSize: '12px' }}>
                                    {displayUser?.id || '—'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Security & Privileges Details */}
                    <Stack spacing={3}>
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
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonOutlined sx={{ color: 'primary.main', fontSize: 20 }} />
                                    Personal Credentials
                                </Typography>

                                <Divider sx={{ mb: 2.5 }} />

                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'action.hover', borderRadius: '12px' }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                                            Full Name
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {displayUser?.name}
                                        </Typography>
                                    </Paper>

                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'action.hover', borderRadius: '12px' }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                                            Email Address
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {displayUser?.email}
                                        </Typography>
                                    </Paper>
                                </Box>
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
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VerifiedUserOutlined sx={{ color: '#10b981', fontSize: 20 }} />
                                    Assigned System Permissions ({displayUser?.permissions?.length ?? 0})
                                </Typography>

                                <Divider sx={{ mb: 2.5 }} />

                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '13px' }}>
                                    Permissions determine the actions you are authorized to perform across modules.
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {displayUser?.permissions && displayUser.permissions.length > 0 ? (
                                        displayUser.permissions.map((permission) => (
                                            <Chip
                                                key={permission}
                                                label={permission}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    fontSize: '12px',
                                                    fontFamily: 'monospace',
                                                    bgcolor: 'background.paper',
                                                    borderColor: 'divider',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                            No explicit granular permissions assigned (managed via Role).
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default ProfilePage;
