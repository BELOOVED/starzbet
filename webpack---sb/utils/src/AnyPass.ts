const anyPass = <T>(predicates: Array<(arg: T) => boolean>): ((arg: T) => boolean) =>
  (arg: T) => predicates.some((predicate) => predicate(arg));

export { anyPass };
