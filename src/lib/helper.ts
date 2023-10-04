export function round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export function format(value: number): string {
    return formatter.format(value);
}
