import { createTheme } from '@mui/material/styles';
import { palette, designTokens } from './palette';
import { typography } from './typography';

const { shadowSm, shadowMd, shadowBtn, hairline, pebble, inkNavy, signalBlue, cloud, paper } = designTokens;

/**
 * MUI Theme — Calendly DESIGN.md
 *
 * Rules enforced:
 * - All shadows use blue-tinted rgba(71,103,136,...) base — never rgba(0,0,0,...)
 * - Buttons: 8px border-radius, 18px/600 text, Signal Blue primary fill
 * - Cards: 16px (product) or 24px (feature panels) border-radius
 * - Inputs: 8px border-radius, Pebble (#f0f3f8) fill
 * - Hairline (#d4e0ed) for all borders
 * - No gradients on backgrounds — flat surfaces + shadow elevation only
 * - Ink Navy (#0b3558) for text, never pure #000000
 */
export const theme = createTheme({
    palette,
    typography,

    spacing: 8, // Base unit: 8px

    shape: {
        borderRadius: 8, // Default — buttons and inputs
    },

    // MUI shadow scale replaced with blue-tinted system
    shadows: [
        'none',
        shadowSm,   // elevation 1
        shadowSm,   // elevation 2
        shadowSm,   // elevation 3
        shadowSm,   // elevation 4
        shadowBtn,  // elevation 5
        shadowBtn,  // elevation 6
        shadowBtn,  // elevation 7
        shadowMd,   // elevation 8
        shadowMd,   // elevation 9
        shadowMd,   // elevation 10
        shadowMd,   // elevation 11
        shadowMd,   // elevation 12
        shadowMd,   // elevation 13
        shadowMd,   // elevation 14
        shadowMd,   // elevation 15
        shadowMd,   // elevation 16
        shadowMd,   // elevation 17
        shadowMd,   // elevation 18
        shadowMd,   // elevation 19
        shadowMd,   // elevation 20
        shadowMd,   // elevation 21
        shadowMd,   // elevation 22
        shadowMd,   // elevation 23
        shadowMd,   // elevation 24
    ],

    components: {
        // ── Global baseline ──────────────────────────────────────────────────
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    textRendering: 'optimizeLegibility',
                    scrollBehavior: 'smooth',
                },
                body: {
                    backgroundColor: cloud,
                    color: inkNavy,
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${hairline} ${cloud}`,
                },
                '::-webkit-scrollbar': { width: '6px', height: '6px' },
                '::-webkit-scrollbar-track': { background: cloud },
                '::-webkit-scrollbar-thumb': { background: hairline, borderRadius: '3px' },
                // Import Manrope from Google Fonts
                '@import': `url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap')`,
            },
        },

        // ── Buttons ──────────────────────────────────────────────────────────
        MuiButton: {
            defaultProps: {
                disableElevation: true,  // Shadows handled via styleOverrides for consistency
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,          // Exact spec from DESIGN.md
                    fontSize: '1.125rem',     // 18px — canonical button size
                    fontWeight: 600,
                    lineHeight: 1.6,
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    transition: 'all 0.15s ease',
                },
                // Primary — Signal Blue filled
                contained: {
                    backgroundColor: signalBlue,
                    color: paper,
                    boxShadow: shadowBtn,
                    padding: '10px 20px',  // Comfortable padding per spec
                    '&:hover': {
                        backgroundColor: '#0052cc',
                        boxShadow: shadowMd,
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: shadowSm,
                    },
                },
                // Secondary — Ink Navy dark button (variant="contained" color="secondary")
                colorSecondary: {
                    backgroundColor: inkNavy,
                    color: paper,
                    '&:hover': {
                        backgroundColor: '#1a4f7a',
                    },
                },
                // Outlined — Hairline border, Ink Navy text
                outlined: {
                    borderColor: hairline,
                    color: inkNavy,
                    borderWidth: '1px',
                    padding: '9px 20px',
                    '&:hover': {
                        borderColor: signalBlue,
                        color: signalBlue,
                        backgroundColor: '#e6f0ff',
                        borderWidth: '1px',
                    },
                },
                // Text — Ghost link style
                text: {
                    color: inkNavy,
                    fontWeight: 500,
                    padding: '4px 8px',
                    '&:hover': {
                        backgroundColor: pebble,
                        color: signalBlue,
                    },
                },
                // Size variants
                sizeLarge: {
                    padding: '12px 24px',
                    fontSize: '1.125rem',
                },
                sizeSmall: {
                    padding: '6px 12px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 6,
                },
            },
        },

        // ── Inputs ───────────────────────────────────────────────────────────
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,                 // inputs: 8px per spec
                        backgroundColor: pebble,         // Pebble fill (#f0f3f8)
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: inkNavy,
                        transition: 'all 0.15s ease',
                        '& fieldset': {
                            borderColor: hairline,       // 1px Hairline border
                            borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                            borderColor: '#a6bbd1',
                        },
                        '&.Mui-focused': {
                            backgroundColor: paper,      // White on focus
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: signalBlue,
                            borderWidth: '1.5px',
                        },
                        '&.Mui-error fieldset': {
                            borderColor: '#d93025',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#476788',
                        fontSize: '1rem',
                        '&.Mui-focused': {
                            color: signalBlue,
                        },
                        '&.Mui-error': {
                            color: '#d93025',
                        },
                    },
                    '& .MuiFormHelperText-root': {
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        marginTop: '4px',
                        color: '#476788',
                        '&.Mui-error': {
                            color: '#d93025',
                        },
                    },
                },
            },
        },

        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontFamily: '"Manrope", "Segoe UI", ui-sans-serif, system-ui, sans-serif',
                },
            },
        },

        // ── Cards ────────────────────────────────────────────────────────────
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: paper,
                    borderRadius: 16,              // Product cards: 16px per spec
                    border: `1px solid ${hairline}`,
                    boxShadow: shadowSm,
                    backgroundImage: 'none',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    '&:hover': {
                        boxShadow: shadowMd,
                    },
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px',               // Card padding: 24px per spec
                    '&:last-child': {
                        paddingBottom: '24px',
                    },
                },
            },
        },

        // ── Paper ────────────────────────────────────────────────────────────
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: paper,
                    backgroundImage: 'none',
                    border: `1px solid ${hairline}`,
                },
                elevation1: { boxShadow: shadowSm },
                elevation2: { boxShadow: shadowSm },
                elevation3: { boxShadow: shadowBtn },
                elevation4: { boxShadow: shadowMd },
            },
        },

        // ── AppBar / Navbar ──────────────────────────────────────────────────
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(248, 249, 251, 0.92)', // Cloud with transparency
                    backdropFilter: 'blur(12px)',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${hairline}`,
                    color: inkNavy,
                    backgroundImage: 'none',
                    minHeight: 64,                 // 64px sticky nav per DESIGN.md Layout
                },
            },
        },

        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: '64px !important',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                },
            },
        },

        // ── Drawer / Sidebar ─────────────────────────────────────────────────
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: paper,
                    borderRight: `1px solid ${hairline}`,
                    boxShadow: 'none',
                },
            },
        },

        // ── List / Navigation items ──────────────────────────────────────────
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '2px 8px',
                    color: '#476788',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                        backgroundColor: pebble,
                        color: inkNavy,
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#e6f0ff',  // Pebble-tinted selected
                        color: signalBlue,
                        fontWeight: 600,
                        '& .MuiListItemIcon-root': {
                            color: signalBlue,
                        },
                        '&:hover': {
                            backgroundColor: '#d4e8ff',
                        },
                    },
                },
            },
        },

        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#a6bbd1',   // Mist Gray for inactive icons
                    minWidth: 38,
                    transition: 'color 0.15s ease',
                },
            },
        },

        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                },
            },
        },

        // ── Chip / Badge ──────────────────────────────────────────────────────
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 50,              // badges: 9999px — pill shape
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    height: 24,
                    '&.MuiChip-colorPrimary': {
                        backgroundColor: '#e6f0ff',
                        color: '#004eba',           // Deep Cobalt for badge text
                    },
                },
                label: {
                    padding: '0 8px',
                },
            },
        },

        // ── Alerts ───────────────────────────────────────────────────────────
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                },
            },
        },

        // ── Menu ─────────────────────────────────────────────────────────────
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    border: `1px solid ${hairline}`,
                    boxShadow: shadowMd,
                    backgroundImage: 'none',
                },
            },
        },

        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: inkNavy,
                    padding: '8px 16px',
                    '&:hover': {
                        backgroundColor: pebble,
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#e6f0ff',
                        color: signalBlue,
                        '&:hover': {
                            backgroundColor: '#d4e8ff',
                        },
                    },
                },
            },
        },

        // ── Divider ──────────────────────────────────────────────────────────
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: hairline,
                },
            },
        },

        // ── Avatar ───────────────────────────────────────────────────────────
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: signalBlue,
                    color: paper,
                    fontFamily: '"Manrope", sans-serif',
                    fontWeight: 600,
                },
            },
        },

        // ── Tooltip ──────────────────────────────────────────────────────────
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: inkNavy,
                    color: paper,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    borderRadius: 6,
                    padding: '6px 10px',
                },
                arrow: {
                    color: inkNavy,
                },
            },
        },

        // ── Typography ───────────────────────────────────────────────────────
        MuiTypography: {
            styleOverrides: {
                root: {
                    // Enforce Ink Navy — never inherit #000000
                    color: 'inherit',
                },
            },
        },

        // ── Table ────────────────────────────────────────────────────────────
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        backgroundColor: pebble,
                        color: '#476788',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        borderBottom: `1px solid ${hairline}`,
                    },
                },
            },
        },

        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root': {
                        '&:hover': {
                            backgroundColor: '#fafbfc',
                        },
                    },
                    '& .MuiTableCell-root': {
                        color: inkNavy,
                        fontSize: '0.9375rem',
                        fontWeight: 400,
                        borderBottom: `1px solid ${hairline}`,
                    },
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '12px 16px',
                    fontFamily: '"Manrope", sans-serif',
                },
            },
        },

        // ── Container ────────────────────────────────────────────────────────
        MuiContainer: {
            styleOverrides: {
                maxWidthLg: {
                    maxWidth: '1200px !important',   // Page max-width: 1200px per spec
                },
            },
        },

        // ── Circular Progress ─────────────────────────────────────────────────
        MuiCircularProgress: {
            defaultProps: {
                color: 'primary',
            },
        },

        // ── Link ─────────────────────────────────────────────────────────────
        MuiLink: {
            styleOverrides: {
                root: {
                    color: signalBlue,
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: '#0052cc',
                    },
                },
            },
        },

        // ── Breadcrumbs ───────────────────────────────────────────────────────
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    color: '#476788',
                },
            },
        },

        // ── Badge ─────────────────────────────────────────────────────────────
        MuiBadge: {
            styleOverrides: {
                badge: {
                    fontFamily: '"Manrope", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.625rem',
                },
            },
        },

        // ── Select ────────────────────────────────────────────────────────────
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: pebble,
                    color: inkNavy,
                    fontWeight: 400,
                    fontSize: '1rem',
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: pebble,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: hairline,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a6bbd1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: signalBlue,
                        borderWidth: '1.5px',
                    },
                    '&.Mui-focused': {
                        backgroundColor: paper,
                    },
                },
            },
        },

        // ── Switch ────────────────────────────────────────────────────────────
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked': {
                        color: signalBlue,
                        '+ .MuiSwitch-track': {
                            backgroundColor: signalBlue,
                        },
                    },
                },
            },
        },

        // ── Checkbox ──────────────────────────────────────────────────────────
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: hairline,
                    '&.Mui-checked': {
                        color: signalBlue,
                    },
                },
            },
        },

        // ── Radio ─────────────────────────────────────────────────────────────
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: hairline,
                    '&.Mui-checked': {
                        color: signalBlue,
                    },
                },
            },
        },

        // ── Tabs ──────────────────────────────────────────────────────────────
        MuiTabs: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${hairline}`,
                },
                indicator: {
                    backgroundColor: signalBlue,
                    height: 2,
                },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: '#476788',
                    letterSpacing: 'normal',
                    padding: '12px 16px',
                    '&.Mui-selected': {
                        color: signalBlue,
                        fontWeight: 600,
                    },
                },
            },
        },

        // ── Pagination ────────────────────────────────────────────────────────
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    fontFamily: '"Manrope", sans-serif',
                    fontWeight: 500,
                    color: inkNavy,
                    borderRadius: 8,
                    '&.Mui-selected': {
                        backgroundColor: signalBlue,
                        color: paper,
                        '&:hover': {
                            backgroundColor: '#0052cc',
                        },
                    },
                },
            },
        },

        // ── Skeleton ──────────────────────────────────────────────────────────
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: pebble,
                    '&::after': {
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
                    },
                },
            },
        },
    },
});
