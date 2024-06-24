import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_banking_muchBetter_legend,
  platformui_starzbet_banking_muchBetter_message_rule1,
  platformui_starzbet_banking_muchBetter_message_rule2,
  platformui_starzbet_banking_muchBetter_message_rule3,
  platformui_starzbet_banking_muchBetter_title_notAMemberYet,
  platformui_starzbet_banking_muchBetter_title_signUpNow,
  platformui_starzbet_placeholder_enterPhoneNumber,
  platformui_starzbet_title_muchBetterMobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotNil, useParamSelector, withCondition } from "@sb/utils";
import { useFormName } from "@sb/form-new";
import classes from "./MuchBetterForm.module.css";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { bankingMuchBetterPhoneNumberExistSelector } from "../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { LinkBlank } from "../../../../Components/LinkBlank/LinkBlank";
import { MUCH_BETTER_FORM_FIELD_PATHS } from "../../../../Store/Banking/Form/MuchBetter/MuchBetterForm";
import { muchBetterSignUpUriSelector } from "../../../../Store/Banking/Form/MuchBetter/MuchBetterFormSelectors";
import { PaymentNoteLabel } from "../PaymentNoteLabel/PaymentNoteLabel";

interface ISignUpLabelProps {
  url: string;
}

const SignUpLabel = memo<ISignUpLabelProps>(({ url }) => {
  const [t] = useTranslation();

  const header = (
    <>
      <span>{t(platformui_starzbet_banking_muchBetter_title_notAMemberYet)}</span>
      &nbsp;

      <LinkBlank href={url} className={classes.signUpLink}>
        {t(platformui_starzbet_banking_muchBetter_title_signUpNow)}
      </LinkBlank>
    </>
  );

  return (
    <PaymentNoteLabel
      header={header}
      className={classes.signUp}
    />
  );
});
SignUpLabel.displayName = "SignUpLabel";

const AlertMessage = withCondition(
  bankingMuchBetterPhoneNumberExistSelector,
  memo(() => {
    const [t] = useTranslation();

    const formName = useFormName();
    const muchBetterUrl = useParamSelector(muchBetterSignUpUriSelector, [formName]);

    return (
      <>
        <div className={classes.alert}>
          <div className={classes.alertTitle}>
            {t(platformui_starzbet_banking_muchBetter_legend)}
          </div>

          <ul className={classes.alertMessages}>
            <li>
              {t(platformui_starzbet_banking_muchBetter_message_rule1)}
            </li>

            <li>
              {t(platformui_starzbet_banking_muchBetter_message_rule2)}
            </li>

            <li>
              {t(platformui_starzbet_banking_muchBetter_message_rule3)}
            </li>
          </ul>
        </div>

        {
          isNotNil(muchBetterUrl)
            ? (
              <SignUpLabel url={muchBetterUrl} />
            )
            : null
        }
      </>
    );
  }),
);
AlertMessage.displayName = "AlertMessage";

const MuchBetterForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroupItem}>
      <AlertMessage />

      <TextField
        fieldPath={MUCH_BETTER_FORM_FIELD_PATHS.phoneNumber}
        label={t(platformui_starzbet_title_muchBetterMobileNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterPhoneNumber)}
      />
    </div>
  );
});
MuchBetterForm.displayName = "MuchBetterForm";

export { MuchBetterForm };
