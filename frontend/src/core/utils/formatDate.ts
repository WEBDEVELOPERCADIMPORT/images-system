/**
 * Formats a Date or ISO date string into a human-readable date string.
 * @param date - Date object or ISO string
 * @param locale - BCP 47 locale string (default: 'en-US')
 * @param options - Intl.DateTimeFormat options
 */
export const formatDate = (
    date: Date | string,
    locale = 'en-US',
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    },
): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '—';
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Formats a Date or ISO date string into a date + time string.
 */
export const formatDateTime = (
    date: Date | string,
    locale = 'en-US',
): string => {
    return formatDate(date, locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};
