export const format = (val: string, exponent = 2): number => {
  const multiplier = Math.pow(10, exponent);
  return Math.round( +val * multiplier + Number.EPSILON ) / multiplier;
}