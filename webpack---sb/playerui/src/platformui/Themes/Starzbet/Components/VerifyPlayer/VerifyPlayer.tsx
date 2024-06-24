// @ts-nocheck
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_verify_congrats,
  platformui_starzbet_verify_emailNotVerified,
  platformui_starzbet_verify_emailVerified,
  platformui_starzbet_verify_returnToHomePage,
  platformui_starzbet_verify_unableToVerify,
  platformui_starzbet_verifyPlayer_title_playerVerificationInProgress,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import errorIcon from "../../Assets/Images/errorExclamation.png";
import classes from "./VerifyPlayer.module.css";
import { NavLinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { When } from "../../../../../common/Components/When";
import { playerSelectors } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { useLocalizedPushPath } from "../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { ThemedModalSuccessMessage } from "../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ThemedModal } from "../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModalButtonsRow } from "../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalButton } from "../ThemedModal/ThemedModalButton/ThemedModalButton";

const ErrorModal = memo(() => {
  const [t] = useTranslation();

  const goToHome = useLocalizedPushPath(routeMap.root);

  return (
    <ThemedModal className={classes.confirm} onCancel={goToHome}>
      <ThemedModalHeader closeButtonClickHandler={goToHome} />

      <ThemedModalBody>
        <img src={errorIcon} className={classes.errorIcon} />

        <div className={classes.title}>{t(platformui_starzbet_verify_emailNotVerified)}</div>

        <div className={classes.errorSubTitle}>{t(platformui_starzbet_verify_unableToVerify)}</div>
      </ThemedModalBody>

      <ThemedModalButtonsRow>
        {/*Temp*/}
        {/*<ThemedModalButton onClick={modalOpenHandler} variant={"primary"}>*/}
        {/*  {t(platformui_starzbet_verify_resendEmail)}*/}
        {/*</ThemedModalButton>*/}

        <ThemedModalButton onClick={goToHome} variant={"secondary"}>
          {t(platformui_starzbet_verify_returnToHomePage)}
        </ThemedModalButton>
      </ThemedModalButtonsRow>
    </ThemedModal>
  );
});
ErrorModal.displayName = "ErrorModal";

const successTitle = [platformui_starzbet_verify_emailVerified];
const successSubtitle = [platformui_starzbet_verify_congrats];

const VerifyPlayer = memo(() => {
  const [t] = useTranslation();

  const { start, confirm, error } = useSelector(playerSelectors.verify);
  const [errorModal, setErrorModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const goToHome = useLocalizedPushPath(routeMap.root);

  useEffect(
    () => {
      setErrorModal(Boolean(error));
      setConfirmModal(confirm);
    },
    [error, confirm],
  );

  return (
    <div className={classes.verifyPage}>
      <NavLinkLocalized to={routeMap.preLive}>
        <div className={classes.image} />
      </NavLinkLocalized>

      <div className={classes.container}>
        <When condition={start}>
          <div className={classes.text}>
            {t(platformui_starzbet_verifyPlayer_title_playerVerificationInProgress)}
          </div>

          <Loader />
        </When>

        <When condition={errorModal}>
          <ErrorModal />
        </When>

        <When condition={confirmModal}>
          <ThemedModalSuccessMessage
            hideModal={goToHome}
            title={successTitle}
            subtitle={successSubtitle}
          />
        </When>
      </div>
    </div>
  );
});
VerifyPlayer.displayName = "VerifyPlayer";

export { VerifyPlayer };
