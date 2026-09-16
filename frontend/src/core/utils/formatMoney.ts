/**
 * Formats a numeric value as a currency string.
 * @param amount - The numeric value to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @param locale - BCP 47 locale string (default: 'en-US')
 */
export const formatMoney = (
    amount: number,
    currency = 'USD',
    locale = 'en-US',
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Formats a numeric value as a compact currency string (e.g. $1.2K, $3.4M).
 */
export const formatMoneyCompact = (
    amount: number,
    currency = 'USD',
    locale = 'en-US',
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(amount);
};
