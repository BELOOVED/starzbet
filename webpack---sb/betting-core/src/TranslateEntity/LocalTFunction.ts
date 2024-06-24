interface IContext {
  [key: string]: string | number;
}

interface IOptionsLocal {
  context?: IContext;
  fallback?: string;

  [interpolationVar: string]: any;
}

// [!] don't use this type outside betting-core
// This function is fork used for resolve circle ref between betting-core and translator components
// Return type must be ReactNode
type TFuncLocal<T = any, Key = string> = (translateKey: Key, options?: IOptionsLocal) => T;

type TFuncWithPlainLocal<T = any, Key = string> = TFuncLocal<T, Key> & { plain: TFuncLocal<string, Key> };

type TFuncOrPlainLocal = TFuncLocal | TFuncWithPlainLocal;

// @ts-ignore
const isWithPlain = <T extends TFuncOrPlainLocal>(t: T): t is TFuncWithPlainLocal => t.hasOwnProperty("plain");

const getPlainTFunc = <T extends TFuncOrPlainLocal>(t: T): TFuncLocal => isWithPlain(t)
  ? t.plain
  : t;

export {
  IOptionsLocal,
  TFuncLocal,
  TFuncWithPlainLocal,
  TFuncOrPlainLocal,
  getPlainTFunc,
};
