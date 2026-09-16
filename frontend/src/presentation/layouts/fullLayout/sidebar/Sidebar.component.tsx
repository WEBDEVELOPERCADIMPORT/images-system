import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Stack,
} from '@mui/material';
import {
    DashboardOutlined,
    PeopleOutlined,
    ImageOutlined,
} from '@mui/icons-material';

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
    {
        label: 'Dashboard',
        path: '/',
        icon: <DashboardOutlined fontSize="small" />,
    },
    {
        label: 'Users',
        path: '/users',
        icon: <PeopleOutlined fontSize="small" />,
    },
    {
        label: 'Images',
        path: '/images',
        icon: <ImageOutlined fontSize="small" />,
    },
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    width: number;
}

const SidebarContent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#ffffff',
            }}
        >
            {/* Brand mark */}
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    gap: 1.5,
                    px: 3,
                    minHeight: 64,          // 64px sticky nav height per DESIGN.md
                    borderBottom: '1px solid #d4e0ed',
                }}
            >
                {/* Logo blob — Signal Blue square mark */}
                <Box
                    sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '6px',
                        backgroundColor: '#006bff',
                        flexShrink: 0,
                    }}
                />
                <Typography
                    variant="h5"
                    noWrap
                    sx={{ fontWeight: 700, color: '#0b3558', fontSize: '1.0625rem' }}
                >
                    Asyncronix
                </Typography>
            </Stack>

            {/* Navigation links */}
            <List sx={{ flex: 1, pt: 1, pb: 1, px: 0 }}>
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <ListItemButton
                            key={item.path}
                            id={`sidebar-nav-${item.label.toLowerCase()}`}
                            selected={active}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon
                                sx={{
                                    color: active ? '#006bff' : '#a6bbd1',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                slotProps={{
                                    primary: {
                                        variant: 'body2',
                                        sx: {
                                            fontWeight: active ? 600 : 500,
                                            color: active ? '#006bff' : '#476788',
                                        },
                                    },
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ borderColor: '#d4e0ed' }} />

            {/* Footer area */}
            <Box sx={{ px: 3, py: 2 }}>
                <Typography variant="caption" sx={{ color: '#a6bbd1' }}>
                    v1.0.0
                </Typography>
            </Box>
        </Box>
    );
};

const Sidebar = ({ open, onClose, width }: SidebarProps) => {
    return (
        <Box component="nav" sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}>
            {/* Mobile — temporary drawer */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { width, boxSizing: 'border-box' },
                }}
            >
                <SidebarContent />
            </Drawer>

            {/* Desktop — permanent drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { width, boxSizing: 'border-box' },
                }}
                open
            >
                <SidebarContent />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
