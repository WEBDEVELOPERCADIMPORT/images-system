import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';
import { LockOutlined, HomeOutlined } from '@mui/icons-material';

const AccessDeniedPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            id="access-denied-page"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fb',   // Cloud canvas
                p: 3,
            }}
        >
            <Stack sx={{ alignItems: 'center', gap: 3, maxWidth: 480, textAlign: 'center' }}>

                {/* Icon — Ink Navy circle with lock */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#f0f3f8',       // Pebble fill
                        border: '1px solid #d4e0ed',       // Hairline border
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'rgba(71,103,136,0.04) 0px 4px 5px 0px, rgba(71,103,136,0.03) 0px 4px 10px 0px, rgba(71,103,136,0.05) 0px 10px 20px 0px',
                    }}
                >
                    <LockOutlined sx={{ fontSize: 36, color: '#476788' }} />
                </Box>

                {/* Error label — overline style */}
                <Typography
                    variant="overline"
                    sx={{ color: '#476788', letterSpacing: '0.12em' }}
                >
                    Error 403
                </Typography>

                {/* Title */}
                <Typography variant="h2" sx={{ color: '#0b3558', fontSize: '2.375rem', fontWeight: 700 }}>
                    Access Denied
                </Typography>

                {/* Description */}
                <Typography
                    variant="body1"
                    sx={{ color: '#476788', lineHeight: 1.7, maxWidth: 400 }}
                >
                    You do not have permission to view this page. If you believe this is a
                    mistake, please contact your administrator or return to the home page.
                </Typography>

                {/* CTA — Primary Signal Blue button */}
                <Button
                    id="access-denied-go-home"
                    variant="contained"
                    size="large"
                    startIcon={<HomeOutlined />}
                    onClick={() => navigate('/', { replace: true })}
                >
                    Go to Home
                </Button>
            </Stack>
        </Box>
    );
};

export default AccessDeniedPage;
