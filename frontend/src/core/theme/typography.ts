import type { TypographyVariantsOptions } from '@mui/material/styles';

/**
 * Typography — Calendly DESIGN.md
 *
 * Font: Manrope (substitute for Gilroy — same geometric humanist sans, wide apertures, even stroke contrast)
 * Loaded via Google Fonts in index.css
 *
 * Scale from DESIGN.md:
 *   caption     12px / 1.5   / 500
 *   body-sm     14px / 1.4   / 400–500
 *   body        16px / 1.6   / 400   (line-height lifted to 1.6 for MUI body comfort)
 *   button      18px / 1.6   / 600
 *   body-lg     20px / 1.4   / 500
 *   subheading  28px / 1.4   / 600
 *   heading-sm  38px / 1.21  / 700
 *   heading     50px / 1.2   / 700
 *   heading-lg  68px / 1.2   / 700
 *   display     80px / 1.2   / 700
 *
 * MUI variant mapping:
 *   h1  → 50px / 700  (page-level hero heading)
 *   h2  → 38px / 700  (section heading)
 *   h3  → 28px / 600  (sub-section heading)
 *   h4  → 20px / 600  (card title)
 *   h5  → 18px / 600  (label heading, button weight)
 *   h6  → 14px / 600  (small label heading)
 *   subtitle1 → 16px / 500  (emphasized body)
 *   subtitle2 → 14px / 500  (secondary label)
 *   body1 → 16px / 400  (primary body copy)
 *   body2 → 14px / 400  (secondary body copy)
 *   caption → 12px / 500
 *   button  → 18px / 600  (all button labels)
 */
export const typography: TypographyVariantsOptions = {
    fontFamily: '"Manrope", "Segoe UI", ui-sans-serif, system-ui, sans-serif',

    h1: {
        fontSize: '3.125rem',     // 50px
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: 'normal',
    },
    h2: {
        fontSize: '2.375rem',     // 38px
        fontWeight: 700,
        lineHeight: 1.21,
        letterSpacing: 'normal',
    },
    h3: {
        fontSize: '1.75rem',      // 28px
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: 'normal',
    },
    h4: {
        fontSize: '1.25rem',      // 20px
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: 'normal',
    },
    h5: {
        fontSize: '1.125rem',     // 18px
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: 'normal',
    },
    h6: {
        fontSize: '0.875rem',     // 14px
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: 'normal',
    },
    subtitle1: {
        fontSize: '1rem',         // 16px
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: 'normal',
    },
    subtitle2: {
        fontSize: '0.875rem',     // 14px
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: 'normal',
    },
    body1: {
        fontSize: '1rem',         // 16px
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: 'normal',
    },
    body2: {
        fontSize: '0.875rem',     // 14px
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: 'normal',
    },
    caption: {
        fontSize: '0.75rem',      // 12px
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: 'normal',
    },
    overline: {
        fontSize: '0.75rem',      // 12px
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
    },
    button: {
        fontSize: '1.125rem',     // 18px — canonical button size per DESIGN.md
        fontWeight: 600,
        lineHeight: 1.6,
        textTransform: 'none',    // No all-caps — Calendly uses sentence case
        letterSpacing: 'normal',
    },
};
