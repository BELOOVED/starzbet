import { curry } from "./Curry";

const groupBy = curry(function _groupBy(fn, list) {
  if (arguments.length === 1) {
    return (_list) => _groupBy(fn, _list);
  }

  const result = {};
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    const key = fn(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
});

export { groupBy };
