type TAlways<T> = () => T

const alwaysFalse = () => false;
const alwaysTrue = () => true;

const always = <T>(val: T): TAlways<T> => {
  if (val === false) {
    return alwaysFalse as TAlways<T>
  }

  if (val === true) {
    return alwaysTrue as TAlways<T>
  }

  return () => val
}

export { always };
