const mergeDeepRight = <T extends object, U extends object>(a: T, b: U) => {
  const result = { ...a } as any;

  for (const [key, value] of Object.entries(b)) {
    if (value !== undefined && typeof value === 'object') {
      result[key] = mergeDeepRight(result[key] || {}, value);
    } else {
      result[key] = value;
    }
  }

  return result as T & U;
};


export { mergeDeepRight };
