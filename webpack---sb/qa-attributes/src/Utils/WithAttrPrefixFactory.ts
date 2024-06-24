const withAttrPrefixFactory =
  (prefix: string) =>
    (...entities: string[]) =>
      `${prefix}__${entities.join("__")}`;

export { withAttrPrefixFactory };
