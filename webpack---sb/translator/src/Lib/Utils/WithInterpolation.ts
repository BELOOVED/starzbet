import { isNotNil } from "@sb/utils";
import { type IOptions } from "../Model/IOptions";

const interpolationDelimiters = {
  start: "{{",
  end: "}}",
};

const reserveKeys = ["context", "fallback"];

/**
 * todo add documentation
 */
const withInterpolation = (
  translated: string | undefined,
  options?: IOptions,
): string | undefined => {
  if (!options || !translated) {
    return translated;
  }

  const possibleKeys = Object.keys(options);

  if (possibleKeys.length === 0) {
    return translated;
  }

  let resultTranslation = translated;

  possibleKeys.forEach((possibleKey) => {
    if (reserveKeys.includes(possibleKey)) {
      return;
    }

    const normalizedKey = `${interpolationDelimiters.start}${possibleKey}${interpolationDelimiters.end}`;

    const option = options[possibleKey];

    if (translated.includes(normalizedKey) && isNotNil(option) && resultTranslation) {
      /**
       * We can pass number to options, in runtime replaceAll works correctly with it,
       * but by types only string can be passed
       */
      resultTranslation = resultTranslation.replaceAll(normalizedKey, String(option));
    }
  });

  return resultTranslation;
};

export { withInterpolation };
