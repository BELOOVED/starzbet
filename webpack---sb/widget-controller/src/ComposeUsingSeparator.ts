import { separator } from "./Separator";

const composeUsingSeparator = (...args: (string | number)[]): string => args.join(separator);

export { composeUsingSeparator };
