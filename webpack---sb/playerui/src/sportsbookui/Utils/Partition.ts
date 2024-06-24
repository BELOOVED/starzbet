const partition = <T>(predicate: (i: T) => boolean, arr: T[]) => {
  const resultTrue: T[] = [];
  const resultFalse: T[] = [];

  arr.forEach((i) => {
    if (predicate(i)) {
      resultTrue.push(i);
    } else {
      resultFalse.push(i);
    }
  });

  return [resultTrue, resultFalse] as const;
};

export { partition };
