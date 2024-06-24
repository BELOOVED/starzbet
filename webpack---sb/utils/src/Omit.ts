const omit = <T extends object, K extends keyof T>(keys: readonly K[], obj: T): Omit<T, K> => {
  const result = { ...obj };

  for (const key of keys) {
    delete result[key];
  }

  return result;
};

export { omit };
