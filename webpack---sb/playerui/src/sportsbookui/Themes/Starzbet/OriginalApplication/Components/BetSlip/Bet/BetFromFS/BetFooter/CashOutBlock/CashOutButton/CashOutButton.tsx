// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from "react";
import {
  sportsbookui_starzbet_betSlip_button_confirm,
  sportsbookui_starzbet_betSlip_button_retry,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./CashOutButton.module.css";
import { Button } from "../../../../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Ellipsis } from "../../../../../../../../../../Components/Ellipsis/Ellipsis";

const buttonState = {
  init: "init",
  confirm: "confirm",
  blocked: "blocked",
  error: "error",
  retry: "retry",
  success: "success",
};

const successTimeout = 2000;

const isInit = (state) => state === buttonState.init;

const isConfirm = (state) => state === buttonState.confirm;

const isBlocked = (state) => state === buttonState.blocked;

const isError = (state) => state === buttonState.error;

const isRetry = (state) => state === buttonState.retry;

const isSuccess = (state) => state === buttonState.success;

const ButtonText = (
  {
    state,
    lastError,
    successMessage,
    children,
  },
) => {
  const [t] = useTranslation();

  const prevState = useRef(state);

  if (isError(state)) {
    return t(lastError);
  }

  if (isRetry(state) || (isBlocked(state) && isRetry(prevState.current))) {
    prevState.current = state;

    return t(sportsbookui_starzbet_betSlip_button_retry);
  }

  if (isConfirm(state) || (isBlocked(state) && isConfirm(prevState.current))) {
    prevState.current = state;

    return t(sportsbookui_starzbet_betSlip_button_confirm);
  }

  if (isSuccess(state)) {
    return successMessage;
  }

  return children;
};
ButtonText.displayName = "ButtonText";

const useButtonState = (inProgress, success, lastError, onClick) => {
  const [state, setState] = useState(buttonState.init);

  useEffect(
    () => {
      if (inProgress) {
        setState(buttonState.blocked);
      }
    },
    [inProgress],
  );

  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      if (success) {
        setState(buttonState.success);

        const timeOut = setTimeout(setState, successTimeout, buttonState.init);

        return () => clearTimeout(timeOut);
      }
    },
    [success],
  );

  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      if (lastError) {
        setState(buttonState.error);

        const timeOut = setTimeout(setState, 2000, buttonState.retry);

        return () => clearTimeout(timeOut);
      }
    },
    [lastError],
  );

  const handleConfirm = useCallback(
    () => {
      if ([buttonState.blocked, buttonState.error, buttonState.success].includes(state)) {
        return;
      }

      if (isInit(state)) {
        setState(buttonState.confirm);

        return;
      }

      onClick();
    },
    [onClick, state, setState],
  );

  return [state, handleConfirm];
};

type TGetColorScheme = (state: keyof typeof buttonState) => "error" | "blue-gradient" | "orange-gradient" | "success"
const getColorScheme: TGetColorScheme = (state) => {
  if (isError(state)) {
    return "error";
  }

  if (isConfirm(state) || isBlocked(state) || isRetry(state)) {
    return "blue-gradient";
  }

  if (isSuccess(state)) {
    return "success";
  }

  return "orange-gradient";
};
const CashOutButton = (
  {
    children,
    onClick,
    inProgress,
    success,
    lastError,
    successMessage,
  },
) => {
  const [state, handleConfirm] = useButtonState(inProgress, success, lastError, onClick);
  const colorScheme = getColorScheme(state);

  return (

    <Button
      className={classes.cashOutButton}
      colorScheme={colorScheme}
      onClick={handleConfirm}
      wide
    >
      <Ellipsis>
        <ButtonText
          state={state}
          lastError={lastError}
          successMessage={successMessage}
        >
          {children}
        </ButtonText>
      </Ellipsis>
    </Button>
  );
};
CashOutButton.displayName = "CashOutButton";

export { CashOutButton };
