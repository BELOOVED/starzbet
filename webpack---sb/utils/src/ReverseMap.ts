export const reverseMap = (map: Record<string, any>) =>
  Object.assign(
    {},
    ...Object.entries(map).map(([key, value]) => ({ [value]: key })),
);
