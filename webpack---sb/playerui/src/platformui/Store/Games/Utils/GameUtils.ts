const addUniq = <T extends IWithId>(currentArr: T[], newArr: T[]): T[] => {
  const uniqArr = newArr.reduce<T[]>(
    (acc, newOne) => {
      const isExist = Boolean(currentArr.find((it) => it.id === newOne.id));

      if (!isExist) {
        acc.push(newOne);// mb replace old on new
      }

      return acc;
    },
    [],
  );

  return currentArr.concat(uniqArr);
};

export { addUniq };
