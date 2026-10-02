/**
 * Format number with comma separators for tabular alignment
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format VE point values with suffix if needed
 */
export function formatVE(amount: number): string {
  return `${formatNumber(amount)} VE`;
}

/**
 * Format currency in USD/INR
 */
export function formatCurrency(amount: number, currency: 'USD' | 'INR' = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
