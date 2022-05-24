export function formatFiatAmount(amount: number, currencyCode: string) {
  return Number(amount).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: currencyCode,
  });
}
