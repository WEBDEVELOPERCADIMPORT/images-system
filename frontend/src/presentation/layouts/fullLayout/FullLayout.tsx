import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar.component';
import Sidebar from './sidebar/Sidebar.component';

const SIDEBAR_WIDTH = 256;

/**
 * FullLayout — authenticated application layout.
 * Composes: Navbar (top) + Sidebar (left) + Main content area (Outlet).
 * Responsive: sidebar collapses to a temporary drawer on mobile.
 */
const FullLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggleSidebar = () => {
        setMobileOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
            <Navbar
                onToggleSidebar={handleToggleSidebar}
                sidebarWidth={SIDEBAR_WIDTH}
            />

            <Sidebar
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                width={SIDEBAR_WIDTH}
            />

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Toolbar spacer — pushes content below the fixed AppBar */}
                <Toolbar />

                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 2, sm: 3 },
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default FullLayout;
