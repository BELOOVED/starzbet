
const mergeRight = <T1, T2>(a: T1, b: T2): T1 & T2 => Object.assign({}, a, b);

export { mergeRight };
