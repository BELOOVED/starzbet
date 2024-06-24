import { memo } from "react";
import { type IWithFieldPath } from "@sb/form-new";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./VerifyCode.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { range } from "../../../../../../../sportsbookui/Utils/Range";
import { FieldCreator, type TFieldChildProps } from "../../../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { VerifyCodeCharacter } from "../../../../../../../common/Components/VerifyCodeCharacter/VerifyCodeCharacter";
import { authValueConverter } from "../../../../../../Store/Auth/Forms/AuthValueConverter";
import { useCodeInput } from "../../../../../../Hooks/UseCodeInput";

const SIZE_CODE = 4;

const RANGE = range(0, SIZE_CODE - 1);

const NewFormVerifyCodeContent = memo<TFieldChildProps<string>>((props) => {
  const {
    onBlur,
    isFocused,
    onFocus,
    onKeyDown,
    onMouseUp,
  } = useCodeInput(props.value);

  return (
    <div className={classes.verifyCode}>
      <input
        {...props}
        inputMode={"numeric"}
        autoFocus={!IS_MOBILE_CLIENT_SIDE}
        maxLength={SIZE_CODE}
        className={classes.verifyCodeInput}
        autoComplete={"off"}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseUp={onMouseUp}
        onKeyDown={onKeyDown}
        {...qaAttr(PlayerUIQaAttributes.DetailsPage.VerificationCodeInput)}
      />

      {
        RANGE.map((index) => (
          <div key={index}>
            <VerifyCodeCharacter
              index={index}
              value={props.value}
              isFocused={isFocused}
              SIZE_CODE={SIZE_CODE}
              className={classes.character}
            />
          </div>
        ))
      }
    </div>
  );
});
NewFormVerifyCodeContent.displayName = "NewFormVerifyCodeContent";

interface IVerifyCodeProps extends IWithFieldPath {
  hideError?: boolean;
}

const VerifyCode = memo<IVerifyCodeProps>(({ fieldPath, hideError }) => (
  <FieldCreator<string>
    ThemedField={Field}
    fieldPath={fieldPath}
    className={classes.fieldContainer}
    valueConverter={authValueConverter}
    hideError={hideError}
  >
    {
      (props) => (
        <NewFormVerifyCodeContent {...props} />
      )
    }
  </FieldCreator>
));
VerifyCode.displayName = "VerifyCode";

export { VerifyCode };
