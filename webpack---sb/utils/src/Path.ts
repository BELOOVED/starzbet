type TPath = (number | string)[];

const path = <T extends unknown>(path: TPath, obj: unknown): T | undefined => {
  let result = obj as any;

  for (const key of path) {
    result = result[key];

    if (result === undefined) {
      return undefined;
    }
  }

  return result;
}

export {
  path,
  type TPath,
};
