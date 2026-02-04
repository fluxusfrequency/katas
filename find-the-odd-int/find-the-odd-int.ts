export function findOdd(xs: number[]): number {
  return xs.reduce((acc, curr) => acc ^ curr, 0);
} 