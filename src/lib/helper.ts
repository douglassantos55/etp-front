export function round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export function format(value: number): string {
    return currencyFormatter.format(value / 100);
}

const percentageFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 });
export function percent(value: number): string {
    return percentageFormatter.format(value);
}

export function toHoursAndMinutes(totalMinutes: number) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}
