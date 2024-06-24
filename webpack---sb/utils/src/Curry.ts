type TAnyFunc = (...args: any[]) => any;

type TPartialTuple<Tuple extends any[], Extracted extends any[] = []> =
// If the tuple provided has at least one required value
  Tuple extends [infer NextParam, ...infer Remaining]
    // recurse back in to this type with one less item in the original tuple, and the latest extracted value added to the extracted list as optional
    ? TPartialTuple<Remaining, [...Extracted, NextParam?]>
    // else if there are no more values, return an empty tuple so that too is a valid option
    : [...Extracted, ...Tuple]


type TPartialParameters<Func extends TAnyFunc> = TPartialTuple<Parameters<Func>>;

type TRemainingParameters<Provided extends any[], Expected extends any[]> =
// if the expected array has any required items
  Expected extends [infer E1, ...infer EX]
    // if the provided array has at least one required item
    ? Provided extends [infer P1, ...infer PX]
      // if the type is correct, recurse with one item less in each array type
      ? P1 extends E1
        // else return this as invalid
        ? TRemainingParameters<PX, EX>
        // else the remaining args is unchanged
        : never
      // else there are no more arguments
      : Expected
    : []

type TCurriedFunction<Provided extends any[], Func extends TAnyFunc> =
  <NewArgs extends TPartialTuple<TRemainingParameters<Provided, Parameters<Func>>>>(...args: NewArgs) =>
    TCurriedFunctionOrReturnValue<[...Provided, ...NewArgs], Func>

type TCurriedFunctionOrReturnValue<Provided extends any[], Func extends TAnyFunc> = TRemainingParameters<Provided, Parameters<Func>> extends [any, ...any[]]
  ? TCurriedFunction<Provided, Func>
  : ReturnType<Func>

function _curry<Func extends TAnyFunc, ExistingArgs extends TPartialParameters<Func>>(func: Func, ...existingArgs: ExistingArgs): TCurriedFunction<ExistingArgs, Func> {
  if (existingArgs.length >= func.length) {
    return func(...existingArgs)
  }

  return function (...args) {
    const totalArgs = [...existingArgs, ...args]

    if (totalArgs.length >= func.length) {
      return func(...totalArgs)
    }

    return _curry(func, ...totalArgs as TPartialParameters<Func>)
  }
}

function curry<Func extends TAnyFunc>(func: Func): TCurriedFunction<[], Func> {
  return function (...args) {
    return _curry(func, ...args as TPartialParameters<Func>);
  } as TCurriedFunction<[], Func>
}

export { curry };
