import { isString } from "./IsTypeOf";

export const capitalizeFirstLetter = (s: string) => {
  if (!isString(s)) {
    console.warn("capitalizeFirstLetter not string received!");

    return "";
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};
