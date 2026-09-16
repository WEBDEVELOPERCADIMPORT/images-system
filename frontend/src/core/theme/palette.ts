import type { PaletteOptions } from '@mui/material/styles';

/**
 * Design system palette — Calendly-inspired "Navy ink on cool marble"
 * Source: DESIGN.md
 *
 * Key rules:
 * - Never use #000000 — always Ink Navy or Slate Gray for text
 * - All elevation shadows must be blue-tinted (never rgba(0,0,0,...))
 * - Signal Blue exclusively for primary CTA fills and active states
 * - Ink Navy for secondary dark buttons, nav links, headings
 */
export const palette: PaletteOptions = {
    mode: 'light',

    primary: {
        main: '#006bff',       // Signal Blue — primary CTA fill, active nav, selected states
        light: '#3d8eff',
        dark: '#0052cc',
        contrastText: '#ffffff',
    },

    secondary: {
        main: '#0b3558',       // Ink Navy — secondary dark buttons, headings, nav links
        light: '#1a4f7a',
        dark: '#07243c',
        contrastText: '#ffffff',
    },

    background: {
        default: '#f8f9fb',    // Cloud — page canvas, footer surface
        paper: '#ffffff',      // Paper — card surfaces, elevated panels
    },

    text: {
        primary: '#0b3558',    // Ink Navy — all primary text, never #000000
        secondary: '#476788',  // Slate Gray — secondary body copy, helper text
        disabled: '#a6bbd1',   // Mist Gray — disabled text, inactive labels
    },

    divider: '#d4e0ed',        // Hairline — card/input borders, dividers

    error: {
        main: '#d93025',
        light: '#e57373',
        dark: '#b71c1c',
        contrastText: '#ffffff',
    },

    warning: {
        main: '#f59e0b',
        light: '#fcd34d',
        dark: '#b45309',
        contrastText: '#0b3558',
    },

    success: {
        main: '#10b981',
        light: '#6ee7b7',
        dark: '#047857',
        contrastText: '#ffffff',
    },

    info: {
        main: '#004eba',       // Deep Cobalt — badge text, info labels
        light: '#3d6fd9',
        dark: '#003a8c',
        contrastText: '#ffffff',
    },

    action: {
        hover: '#f0f3f8',      // Pebble — hover wash on interactive surfaces
        selected: '#e6f0ff',   // Pebble-tinted — selected state background
        disabledBackground: '#f0f3f8',
        disabled: '#a6bbd1',
    },
};

/**
 * Extended palette tokens for direct use in sx props via theme.palette.design.*
 * Declared here for reference; used in theme.ts via custom CSS vars.
 */
export const designTokens = {
    inkNavy: '#0b3558',
    signalBlue: '#006bff',
    slateGray: '#476788',
    mistGray: '#a6bbd1',
    cloud: '#f8f9fb',
    paper: '#ffffff',
    pebble: '#f0f3f8',
    hairline: '#d4e0ed',
    carbon: '#0a0a0a',
    coralMagenta: '#e55cff',
    skyCyan: '#0099ff',
    deepCobalt: '#004eba',

    // Shadows — blue-tinted only (never rgba(0,0,0,...))
    shadowSm:  'rgba(71,103,136,0.04) 0px 4px 5px 0px, rgba(71,103,136,0.03) 0px 4px 10px 0px, rgba(71,103,136,0.05) 0px 10px 20px 0px',
    shadowMd:  'rgba(71,103,136,0.04) 0px 4px 5px 0px, rgba(71,103,136,0.03) 0px 8px 15px 0px, rgba(71,103,136,0.08) 0px 30px 50px 0px',
    shadowBtn: 'rgba(71,103,136,0.04) 0px 4px 5px 0px, rgba(71,103,136,0.03) 0px 8px 15px 0px, rgba(71,103,136,0.06) 0px 15px 30px 0px',
} as const;
