const range = (start: number, end: number) => Array<number>(end - start + 1)
  .fill(start)
  .map((x, y) => x + y);

export { range };
