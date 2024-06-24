const update = <T = unknown>(index: number, value: T, list: T[]) => (
  [
    ...list.slice(0, index),
    value,
    ...list.slice(index + 1),
  ]
);

export { update };
