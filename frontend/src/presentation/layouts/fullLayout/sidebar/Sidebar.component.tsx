import React from 'react';
import {
    Box,
    Drawer,
    List,
    Typography,
    Stack,
    Divider,
} from '@mui/material';
import MenuItems from './menuItems';
import SidebarItem from './SidebarItem';
import {
    useSidebar,
    SIDEBAR_EXPANDED_WIDTH,
    SIDEBAR_COLLAPSED_WIDTH,
} from './SidebarContext';

const SidebarContent: React.FC = () => {
    const { isCollapsed } = useSidebar();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                overflowX: 'hidden',
            }}
        >
            {/* Header with Logo */}
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    gap: 1.5,
                    px: isCollapsed ? 1 : 2.5,
                    minHeight: 64,
                    borderBottom: '1px solid #e2e8f0',
                }}
            >
                {/* Logo Mark */}
                <Box
                    component="img"
                    src="/logo.png"
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                />

                {!isCollapsed && (
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontWeight: 700,
                            color: '#0b3558',
                            fontSize: '1.05rem',
                            letterSpacing: '-0.3px',
                        }}
                    >
                        Cad Import Inc
                    </Typography>
                )}
            </Stack>

            {/* Navigation items list */}
            <List sx={{ flex: 1, py: 1.5, px: 0, overflowY: 'auto' }}>
                {MenuItems.map((item, index) => (
                    <SidebarItem key={item.name || item.group || index} item={item} />
                ))}
            </List>

            <Divider sx={{ borderColor: '#e2e8f0' }} />

            {/* Footer version */}
            <Box
                sx={{
                    px: isCollapsed ? 1 : 2.5,
                    py: 1.5,
                    textAlign: isCollapsed ? 'center' : 'left',
                }}
            >
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11px' }}>
                    {isCollapsed ? 'v1' : 'Cad Import Inc v1.0'}
                </Typography>
            </Box>
        </Box>
    );
};

export const Sidebar: React.FC = () => {
    const { isMobileOpen, closeMobileSidebar, isCollapsed } = useSidebar();

    const currentWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;

    return (
        <Box
            component="nav"
            sx={{
                width: { md: currentWidth },
                flexShrink: { md: 0 },
                transition: 'width 0.25s ease',
            }}
        >
            {/* Mobile Drawer (Slide in from left over content) */}
            <Drawer
                variant="temporary"
                open={isMobileOpen}
                onClose={closeMobileSidebar}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: SIDEBAR_EXPANDED_WIDTH,
                        boxSizing: 'border-box',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    },
                }}
            >
                <SidebarContent />
            </Drawer>

            {/* Desktop Permanent Drawer (Mini collapsed or expanded) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: currentWidth,
                        boxSizing: 'border-box',
                        transition: 'width 0.25s ease',
                        overflowX: 'hidden',
                    },
                }}
                open
            >
                <SidebarContent />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
