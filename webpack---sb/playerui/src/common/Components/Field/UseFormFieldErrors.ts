import { useMemo } from "react";
import { selectFormFieldErrors, type TFieldPath, useFormSelector } from "@sb/form-new";
import { type IOptions, useTranslation } from "@sb/translator";
import { isNil, isString } from "@sb/utils";

type TTranslatableError = {
  tKey: string;
  options?: IOptions;
};

const useFormFieldErrors = (path: TFieldPath) => {
  const [t] = useTranslation();

  const errors = useFormSelector(selectFormFieldErrors<TTranslatableError>, [path]);

  return useMemo(
    () => {
      if (isNil(errors)) {
        return null;
      }

      const translatedErrors = errors.map((error) => {
        if (isString(error)) {
          return error;
        }

        const { tKey, options } = error;

        return t.plain(tKey, options);
      });

      if (translatedErrors.length === 1) {
        return translatedErrors[0];
      }

      return translatedErrors.join(", ");
    },
    [errors],
  );
};

export { useFormFieldErrors };
