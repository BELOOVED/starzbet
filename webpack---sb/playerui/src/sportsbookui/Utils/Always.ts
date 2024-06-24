const always = <V = unknown>(value: V) => () => value;

const T = () => true;

export { always, T };
