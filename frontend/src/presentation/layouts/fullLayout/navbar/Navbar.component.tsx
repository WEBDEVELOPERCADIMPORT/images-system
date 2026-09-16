import { useState } from 'react';
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
    PersonOutlined,
    LogoutOutlined,
} from '@mui/icons-material';
import { useAuthStore } from '../../../../core/store/authStore';

interface NavbarProps {
    onToggleSidebar: () => void;
    sidebarWidth: number;
}

const Navbar = ({ onToggleSidebar, sidebarWidth }: NavbarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleCloseMenu();
        clearAuth();
        navigate('/auth/login', { state: { from: location } });
    };

    const initials = user?.name
        ? user.name
              .split(' ')
              .slice(0, 2)
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
        : '?';

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${sidebarWidth}px)` },
                ml: { sm: `${sidebarWidth}px` },
                transition: 'width 0.25s ease, margin 0.25s ease',
            }}
        >
            <Toolbar>
                {/* Mobile sidebar toggle */}
                <IconButton
                    id="navbar-toggle-sidebar"
                    aria-label="Toggle navigation sidebar"
                    edge="start"
                    onClick={onToggleSidebar}
                    sx={{
                        display: { sm: 'none' },
                        color: '#476788',
                        mr: 1,
                        '&:hover': { backgroundColor: '#f0f3f8' },
                    }}
                >
                    <MenuOutlined />
                </IconButton>

                {/* App name */}
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        color: '#0b3558',
                        letterSpacing: 'normal',
                    }}
                >
                    Asyncronix
                </Typography>

                {/* User avatar + menu */}
                <Tooltip title="Account settings" arrow>
                    <IconButton
                        id="navbar-user-menu-button"
                        onClick={handleOpenMenu}
                        size="small"
                        sx={{ p: 0.5 }}
                        aria-controls={anchorEl ? 'user-account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                backgroundColor: '#006bff',
                                color: '#ffffff',
                            }}
                        >
                            {initials}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    id="user-account-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    onClick={handleCloseMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{
                        paper: {
                            sx: { minWidth: 210, mt: 1 },
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#0b3558' }}>
                            {user?.name ?? 'User'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#476788', display: 'block' }}>
                            {user?.email ?? ''}
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem id="navbar-menu-profile" onClick={handleCloseMenu}>
                        <ListItemIcon sx={{ color: '#476788' }}>
                            <PersonOutlined fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem id="navbar-menu-logout" onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutOutlined fontSize="small" sx={{ color: 'error.main' }} />
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 500 }}>
                            Sign out
                        </Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
