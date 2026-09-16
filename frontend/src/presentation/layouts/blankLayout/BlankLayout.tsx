import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

/**
 * BlankLayout — used for public/unauthenticated pages such as login and registration.
 * Provides a clean, centered container with no navigation chrome.
 */
const BlankLayout = () => {
    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default BlankLayout;
