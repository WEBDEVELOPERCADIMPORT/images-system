import { Box, CircularProgress, Typography } from '@mui/material';

interface FullPageLoaderProps {
    message?: string;
}

/**
 * FullPageLoader — full-screen centered loader.
 * Uses Signal Blue progress ring on Cloud canvas per DESIGN.md.
 */
const FullPageLoader = ({ message = 'Loading...' }: FullPageLoaderProps) => {
    return (
        <Box
            id="full-page-loader"
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                backgroundColor: '#f8f9fb',   // Cloud canvas
                zIndex: 9999,
            }}
        >
            {/* Layered ring — outer track + animated spinner */}
            <Box
                sx={{
                    position: 'relative',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Track ring */}
                <CircularProgress
                    size={48}
                    thickness={2.5}
                    variant="determinate"
                    value={100}
                    sx={{
                        color: '#d4e0ed',    // Hairline — track color
                        position: 'absolute',
                    }}
                />
                {/* Animated ring — Signal Blue */}
                <CircularProgress
                    size={48}
                    thickness={2.5}
                    sx={{ color: '#006bff' }}
                />
            </Box>

            {message && (
                <Typography
                    variant="body2"
                    sx={{
                        color: '#476788',
                        fontWeight: 500,
                        letterSpacing: '0.01em',
                    }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default FullPageLoader;
