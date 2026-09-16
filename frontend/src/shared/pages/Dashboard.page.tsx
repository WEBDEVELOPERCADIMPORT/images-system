import { Typography, Box } from '@mui/material';

/**
 * Temporary Dashboard placeholder page.
 * Replace this with the actual dashboard module page once it is implemented.
 */
const DashboardPage = () => {
    return (
        <Box>
            <Typography
                variant="h2"
                sx={{ fontWeight: 700, color: '#0b3558', mb: 1, fontSize: '1.75rem' }}
            >
                Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#476788' }}>
                Welcome to Asyncronix. Select a section from the sidebar to get started.
            </Typography>
        </Box>
    );
};

export default DashboardPage;
