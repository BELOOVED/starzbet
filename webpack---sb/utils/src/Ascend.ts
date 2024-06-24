const ascend = <T>(fn: (value: T) => string | number) => (a: T, b: T) => {
  const aa = fn(a);
  const bb = fn(b);

  if(aa < bb) {
    return -1
  }

  return aa > bb ? 1 : 0;
}

export { ascend }
