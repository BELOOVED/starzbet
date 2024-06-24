import clsx from "clsx";
import { memo } from "react";
import { isNotNil } from "@sb/utils";
import { qaAttr } from "@sb/qa-attributes";
import { platformui_starzbet_title_optional } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./Field.module.css";
import { type TDefaultFieldProps, type TFieldStatus } from "../../../../Components/Field/FieldCreator";

const Optional = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      &nbsp;
      {"("}

      {t(platformui_starzbet_title_optional)}

      {")"}
    </>
  );
});
Optional.displayName = "Optional";

const captionsClassName: Record<TFieldStatus, string | undefined> = {
  default: classes.defaultCaption,
  error: classes.errorCaption,
};

const Field = ({
  children,
  label,
  caption,
  className,
  validationQaAttribute,
  optional,
  status = "default",
  ghost,
  hideError,
  fieldQaAttribute,
  ...rest
}: TDefaultFieldProps) => {
  const rootClassName = clsx(
    classes.field,
    className,
  );

  return (
    <div {...rest} className={rootClassName} {...qaAttr(fieldQaAttribute)}>
      {
        !ghost
          ? (
            <div className={classes.fieldHeader}>
              <div className={classes.labelGroup}>
                <label className={classes.label}>
                  {label}
                </label>

                {optional ? <Optional /> : null}
              </div>
            </div>
          )
          : null
      }

      <div className={classes.inputContainer}>
        {children}
      </div>

      {
        !hideError
          ? (
            <div className={classes.fieldFooter}>
              {
                isNotNil(caption)
                  ? (
                    <span {...qaAttr(validationQaAttribute)} className={captionsClassName[status]}>
                      {caption}
                    </span>
                  )
                  : null
              }
            </div>
          )
          : null
      }
    </div>
  );
};
Field.displayName = "Field";

export { Field };
