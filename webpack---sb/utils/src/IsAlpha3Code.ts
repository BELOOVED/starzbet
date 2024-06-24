import { EAlpha3Code } from "./EAlpha3Code";
import { isString } from "./IsTypeOf";

const isAlpha3Code = (candidate: unknown): candidate is EAlpha3Code => isString(candidate) && Object.hasOwn(EAlpha3Code, candidate);

export {
  isAlpha3Code,
}
