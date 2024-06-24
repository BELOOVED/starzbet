import { memo } from "react";
import { withProps } from "@sb/utils";
import classes from "./PhoneNumberInput.module.css";
import { PhoneNumberInputCreator } from "../../../../Components/PhoneNumberInputCreator/PhoneNumberInputCreator";
import type { ISelectOption } from "../../../../Components/Field/SelectModel";
import { phoneCodeToFlagMap } from "../../../../Utils/GetDefaultPhoneCode";
import { Select } from "../Select/Select";
import { Input } from "../Input/Input";

const Option = memo<ISelectOption<string>>(({ value }) => {
  const style = { backgroundImage: `url(${phoneCodeToFlagMap[value]})` };

  return (
    <div className={classes.option}>
      <div className={classes.flag} style={style} />

      <span>{value}</span>
    </div>
  );
});
Option.displayName = "Option";

const PhoneNumberInput = withProps(PhoneNumberInputCreator)({
  Input,
  Select,
  Option,
  className: classes.phoneNumberInput,
});

export { PhoneNumberInput };
