import { memo } from "react";
import {
  sportsbookui_starzbet_betConstructor_joinNow,
  sportsbookui_starzbet_loginModal_logIn,
  sportsbookui_starzbet_loginModal_text,
  sportsbookui_starzbet_loginModal_watch,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./LoginModal.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { LoaderImg } from "../../../../../../../common/Themes/Starzbet/Components/LoaderImg/LoaderImg";
import { ThemedModal } from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModal";
import { ThemedModalText } from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalText/ThemedModalText";
import {
  ThemedModalTextBlock,
} from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import {
  ThemedModalButtonsRow,
} from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import {
  ThemedModalHeader,
} from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { useLogin, useRegistration } from "../../../../../../../common/Hooks/UseAuth";

const LoginModal = memo(() => {
  const closeHandler = useModalCloseAction(EModal.login);
  const [t] = useTranslation();

  const gotoRegistration = useRegistration();
  const gotoLogin = useLogin();

  return (
    <ThemedModal onCancel={closeHandler}>
      <ThemedModalHeader closeButtonClickHandler={closeHandler} />

      <ThemedModalBody>
        <div className={classes.iconWrapper}>
          <LoaderImg className={classes.icon} />
        </div>

        <ThemedModalTextBlock>
          <ThemedModalText size={"xl"}>
            {t(sportsbookui_starzbet_loginModal_watch)}
          </ThemedModalText>

          <ThemedModalText size={"md"} color={"dark"}>
            {t(sportsbookui_starzbet_loginModal_text)}
          </ThemedModalText>
        </ThemedModalTextBlock>

        <ThemedModalButtonsRow>
          <Button
            capitalize
            colorScheme={"blue-gradient"}
            onClick={gotoRegistration}
            wide={IS_MOBILE_CLIENT_SIDE}
          >
            {t(sportsbookui_starzbet_betConstructor_joinNow)}
          </Button>

          <Button
            capitalize
            colorScheme={"secondary-grey"}
            onClick={gotoLogin}
            wide={IS_MOBILE_CLIENT_SIDE}
          >
            {t(sportsbookui_starzbet_loginModal_logIn)}
          </Button>
        </ThemedModalButtonsRow>
      </ThemedModalBody>
    </ThemedModal>

  );
});
LoginModal.displayName = "LoginModal";

export { LoginModal };
