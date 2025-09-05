export class MoneyUtils {
  static fromCents(cents: number): number {
    return cents / 100;
  }

  static toCents(amount: number): number {
    return Math.round(amount * 100);
  }

  static format(cents: number, locale = 'en-US', currency = 'USD'): string {
    const amount = this.fromCents(cents);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }
}
