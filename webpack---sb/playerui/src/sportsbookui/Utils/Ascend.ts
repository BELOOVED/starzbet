import { curry } from "@sb/utils/Curry";

const ascend = curry((fn, a, b) => {
  const aa = fn(a);
  const bb = fn(b);

  if(aa < bb){
    return -1;
  }

  return aa > bb ? 1 : 0;
});

export { ascend };
