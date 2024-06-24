import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { platformui_starzbet_button_login, platformui_starzbet_regSteps_signUp } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useIsTurnstileSolved } from "@sb/captcha";
import classes from "../Register.module.css";
import { captchaVisible } from "../../../../../../../common/Constants/CaptchaVisible";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useOpenLoginModal } from "../../../../../../Store/Auth/Forms/Registration/Hooks/UseOpenLoginModal";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { RegisterIcon } from "../../../../Components/Icons/RegisterIcon";
import { LoginArrow } from "../../../../Components/Icons/LoginArrow";

interface IButtonsProps {
  loading: boolean;
}

const Buttons = memo<IButtonsProps>(({ loading }) => {
  const goToLogin = useOpenLoginModal();
  const [t] = useTranslation();
  const isSolved = useIsTurnstileSolved(captchaVisible);

  return (
    <div className={classes.buttons}>
      <div
        onClick={goToLogin}
        className={clsx(classes.button, classes.loginButton)}
        {...qaAttr(PlayerUIQaAttributes.AuthPage.SignInButton)}
      >
        <Ellipsis>
          {t(platformui_starzbet_button_login)}
        </Ellipsis>

        <LoginArrow />
      </div>

      <Button
        type={"submit"}
        contentClassName={classes.mainButtonContent}
        qaAttribute={PlayerUIQaAttributes.AuthPage.SignUpButton}
        colorScheme={"blue-gradient"}
        loading={!isSolved || loading}
        wide
      >
        <Ellipsis>
          {t(platformui_starzbet_regSteps_signUp)}
        </Ellipsis>

        <RegisterIcon />
      </Button>
    </div>
  );
});
Buttons.displayName = "Buttons";

export { Buttons };
