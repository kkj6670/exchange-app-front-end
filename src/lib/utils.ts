export const comma = (x: string | number): string => {
  const str = String(x).split('.');
  const num = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const comma = str[1];

  return `${num}${comma === undefined ? '' : '.'+comma}`;
};