import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_registration_agreeTo,
  platformui_starzbet_registration_and,
  platformui_starzbet_registration_privacyPolicy,
  platformui_starzbet_registration_termsOfUse,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type IWithQaAttribute, PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./RegistrationConsent.module.css";
import { ResetedLink } from "../../../../../../../sportsbookui/Components/ResetedLink/ResetedLink";
import type { TFieldChildProps } from "../../../../../../../common/Components/Field/FieldCreator";
import { useCMSPageLinkByPageType } from "../../../../../../Hooks/UseCMSPageLinkByPageType";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { EPagesDefaultThemeOne } from "../../../../../../Store/CMS/Model/CmsEnums";
import { CheckedIcon } from "../../../../Components/Icons/CheckedIcon/CheckedIcon";

const RegistrationConsent = memo<TFieldChildProps<boolean> & IWithQaAttribute>(({
  disabled,
  onChange,
  value,
  qaAttribute,
}) => {
  const [t] = useTranslation();

  const termsConditionsLink = useCMSPageLinkByPageType(EPagesDefaultThemeOne.terms);

  const privacyPolicyLink = useCMSPageLinkByPageType(EPagesDefaultThemeOne.privacy);

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <span>
          {t(platformui_starzbet_registration_agreeTo)}
        </span>

        <ResetedLink
          {...termsConditionsLink}
          target={"_blank"}
          className={classes.link}
        >
          <Ellipsis>
            {t(platformui_starzbet_registration_termsOfUse)}
          </Ellipsis>
        </ResetedLink>

        <span>
          {t(platformui_starzbet_registration_and)}
        </span>

        <ResetedLink
          {...privacyPolicyLink}
          target={"_blank"}
          className={classes.link}
        >
          <Ellipsis>
            {t(platformui_starzbet_registration_privacyPolicy)}
          </Ellipsis>
        </ResetedLink>
      </div>

      <label className={clsx(classes.switch, disabled && classes.disabled)} {...qaAttr(qaAttribute)}>
        <input
          type={"checkbox"}
          checked={value}
          onChange={onChange}
          disabled={disabled}
          className={classes.input}
        />

        <span
          className={clsx(classes.checkbox)} {...qaAttr(PlayerUIQaAttributes.SignUpPage.TermsOfUseAgreementCheckbox)}
        >
          <CheckedIcon height={8} width={10} />
        </span>
      </label>
    </div>
  );
});
RegistrationConsent.displayName = "RegistrationConsent";

export { RegistrationConsent };
