import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { isNotNil, useActionWithBind } from "@sb/utils";
import { resetFormAction, useFormName } from "@sb/form-new";
import { useLocalizedPushPath } from "../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../RouteMap/RouteMap";
import { useCountdown } from "../../../Hooks/UseCountdown";
import { depositLinkSelector } from "../Selectors/PlatformBankingSelectors";
import { depositAnSpacePayFormResponseSelector } from "../Form/AnSpacePay/AnSpacePayFormSelectors";

const useModalRedirect = (link: string | null) => {
  const formName = useFormName();

  const goToPending = useLocalizedPushPath(routeMap.bankingHistoryDepositsRoute);
  const [seconds] = useCountdown(3);
  const reset = useActionWithBind(resetFormAction, formName);

  const hideModal = useCallback(
    () => {
      reset();
      goToPending();
    },
    [],
  );
  const redirect = useRef(true);
  const goToLink = () => {
    isNotNil(link) && window.open(link, "_blank");
    redirect.current = false;
  };

  useEffect(
    () => {
      if (seconds === 0 && redirect.current) {
        goToLink();
      }
    },
    [seconds],
  );

  return {
    hideModal,
    goToLink,
    seconds,
  };
};

const useModalWithRedirect = () => {
  const link = useSelector(depositLinkSelector);

  return useModalRedirect(link);
};

const useAnSpacePayModal = () => {
  const response = useSelector(depositAnSpacePayFormResponseSelector);
  const goToPending = useLocalizedPushPath(routeMap.bankingHistoryDepositsRoute);

  return {
    qrCode: response.urlQRCode,
    qrCodeString: response.qrCodeString,
    hideModal: goToPending,
  };
};

export { useModalWithRedirect, useAnSpacePayModal };
