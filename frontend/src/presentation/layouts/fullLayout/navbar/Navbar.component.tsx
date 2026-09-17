import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    Box,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from '@mui/material';
import {
    MenuOutlined,
    MenuOpenOutlined,
    PersonOutlined,
    LogoutOutlined,
} from '@mui/icons-material';
import { useAuthStore } from '../../../../core/store/authStore';
import { useSidebar, SIDEBAR_EXPANDED_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '../sidebar/SidebarContext';
import { api } from '../../../../core/api/axios.instance';

export const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, clearAuth } = useAuthStore();
    const { toggleSidebar, isCollapsed } = useSidebar();
    const navigate = useNavigate();
    const location = useLocation();

    const currentSidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleNavigateProfile = () => {
        handleCloseMenu();
        navigate('/profile');
    };

    const handleLogout = async () => {
        handleCloseMenu();
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error('Logout error on server:', err);
        } finally {
            clearAuth();
            navigate('/auth/login', { state: { from: location } });
        }
    };


    const initials = user?.name
        ? user.name
            .split(' ')
            .slice(0, 2)
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
        : 'U';

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { md: `calc(100% - ${currentSidebarWidth}px)` },
                ml: { md: `${currentSidebarWidth}px` },
                transition: 'width 0.25s ease, margin-left 0.25s ease',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                color: '#0b3558',
            }}
        >
            <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 3 } }}>
                {/* Toggle Button for Desktop (collapse/expand) and Mobile (drawer) */}
                <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} arrow>
                    <IconButton
                        id="navbar-toggle-sidebar"
                        aria-label="Toggle navigation sidebar"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{
                            color: '#476788',
                            mr: 1.5,
                            borderRadius: '8px',
                            '&:hover': { backgroundColor: '#f1f5f9' },
                        }}
                    >
                        {isCollapsed ? <MenuOpenOutlined /> : <MenuOutlined />}
                    </IconButton>
                </Tooltip>

                {/* App Brand / Context Title */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        color: '#0b3558',
                        fontSize: '1.1rem',
                        letterSpacing: '-0.3px',
                    }}
                >
                    Asset Management Platform
                </Typography>

                {/* User Profile Avatar & Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0b3558', lineHeight: 1.2 }}>
                            {user?.name ?? 'Admin User'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {user?.role || user?.roles?.[0] || 'User'}
                        </Typography>
                    </Box>

                    <Tooltip title="Account menu" arrow>
                        <IconButton
                            id="navbar-user-menu-button"
                            onClick={handleOpenMenu}
                            size="small"
                            sx={{ p: 0.25 }}
                            aria-controls={anchorEl ? 'user-account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorEl ? 'true' : undefined}
                        >
                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    backgroundColor: '#006bff',
                                    color: '#ffffff',
                                }}
                            >
                                {initials}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Dropdown Menu */}
                <Menu
                    id="user-account-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{
                        paper: {
                            sx: {
                                minWidth: 220,
                                mt: 1,
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            },
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#0b3558', fontWeight: 600 }}>
                            {user?.name ?? 'User'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            {user?.email ?? ''}
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: '#e2e8f0' }} />

                    <MenuItem id="navbar-menu-profile" onClick={handleNavigateProfile} sx={{ py: 1, gap: 1.5 }}>
                        <ListItemIcon sx={{ color: '#64748b', minWidth: 0 }}>
                            <PersonOutlined fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ color: '#334155' }}>
                            My Profile
                        </Typography>
                    </MenuItem>

                    <Divider sx={{ borderColor: '#e2e8f0' }} />

                    <MenuItem id="navbar-menu-logout" onClick={handleLogout} sx={{ py: 1, gap: 1.5 }}>
                        <ListItemIcon sx={{ color: '#ef4444', minWidth: 0 }}>
                            <LogoutOutlined fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 500 }}>
                            Sign out
                        </Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
