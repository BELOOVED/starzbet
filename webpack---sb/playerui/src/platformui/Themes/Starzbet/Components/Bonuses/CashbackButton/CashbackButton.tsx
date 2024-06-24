/* eslint-disable rulesdir/jsx-element-max-length */

import clsx from "clsx";
import { type FC, memo, type PropsWithChildren, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { type TFuncWithPlain, useTranslation } from "@sb/translator";
import {
  EMoneyFormat,
  type IMoney,
  isNil,
  isNotNil,
  Money,
  type TVoidFn,
  useActionWithBind,
  useParamSelector,
  withParamCondition,
} from "@sb/utils";
import {
  platformui_starzbet_bonus_cashback_cashbackNeedToPlayMessage,
  platformui_starzbet_bonus_cashback_cashbackWithMoney,
  platformui_starzbet_bonus_cashback_eligibleToReceiveMessage,
  platformui_starzbet_bonus_cashback_succeed_transferSuccessful,
  platformui_starzbet_bonus_cashback_succeed_transferSuccessfulMessage,
  platformui_starzbet_bonus_cashback_transfer,
  platformui_starzbet_bonus_cashback_validation_pleaseWait,
  platformui_starzbet_bonus_cashback_validation_youCashbackIsBeingCalculated,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import classes from "./CashbackButton.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { BaseModalCreator } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { usePlayerRequestWalletAction } from "../../../../../../common/Store/Player/Hooks/UsePlayerRequestWalletAction";
import { playerCurrencySelector } from "../../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type IWithDisabled } from "../../../../../../common/IWith";
import {
  availableBonusCashbackModalDataSelector,
  cashbackFrontValidationErrorSelector,
  isCashbackBonusAvailableSelector,
  type IWithNotVipClubBonus,
} from "../../../../../Store/Bonuses/Selectors/CashbackBonusesSelectors";
import { transferCashbackAction, transferCashbackModalOpenedAction } from "../../../../../Store/Bonuses/BonusesActions";
import { platformBonusesSelectors } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { TRANSFER_CASHBACK_CALL_SYMBOL } from "../../../../../Store/Bonuses/BonusVariables";
import {
  cashbackFrontValidationErrorMap,
} from "../../../../../Store/Bonuses/Model/ErrorMaps/CashbackFrontValidationErrorMap";
import {
  type ECashbackFrontValidationError,
} from "../../../../../Store/Bonuses/Model/Enums/ECashbackFrontValidationError";
import {
  requestCashbackSumErrorMessageSelector,
  requestCashbackSumLoadingSelector,
  transferCashbackErrorMessageSelector,
  transferCashbackLoadingSelector,
  transferCashbackSucceededSelector,
} from "../../../../../Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { transformOptionsWithMoney } from "../../../Model/Bonus/BonusRewardsModel";
import { PrizeIcon } from "../../Icons/PrizeIcon";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModalSuccessMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { BonusDescriptionTitle } from "../Cards/Common/BonusDescriptionTitle/BonusDescriptionTitle";
import { BonusRulesBase } from "../Cards/Common/BonusRules/BonusRules";

const LoadingContent = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <div className={classes.title}>
        {t(platformui_starzbet_bonus_cashback_validation_pleaseWait)}
      </div>

      <div className={classes.content}>
        {t(platformui_starzbet_bonus_cashback_validation_youCashbackIsBeingCalculated)}
      </div>

      <Loader className={classes.spinner} />
    </>
  );
});
LoadingContent.displayName = "LoadingContent";

interface IValidationErrorProps {
  error: ECashbackFrontValidationError;
  options?: { money?: IMoney; };
}

const ValidationError = memo<IValidationErrorProps>(({ error, options = {} }) => {
  const [t] = useTranslation();

  return (
    <span>
      {t(cashbackFrontValidationErrorMap[error], transformOptionsWithMoney(options))}
    </span>
  );
});
ValidationError.displayName = "ValidationError";

const CashbackContent = memo<IWithNotVipClubBonus>(({ notVipClubBonus }) => {
  const [t] = useTranslation();
  const currency = useSelector(playerCurrencySelector);
  const cashbackSum = useSelector(platformBonusesSelectors.cashbackSum);
  const {
    bonusId,
    bonusRules,
    descriptionTitle,
  } = useParamSelector(availableBonusCashbackModalDataSelector, [notVipClubBonus]);

  const frontValidationError = useParamSelector(cashbackFrontValidationErrorSelector, [notVipClubBonus]);
  const requestCashbackError = useSelector(requestCashbackSumErrorMessageSelector);
  const transferCashbackError = useSelector(transferCashbackErrorMessageSelector);
  const backendError = requestCashbackError || transferCashbackError;

  const transferCashback = useActionWithBind(transferCashbackAction, notVipClubBonus);

  const zeroMoney = Money.getZero(currency);

  const cashback = isNil(frontValidationError) && isNil(backendError)
    ? cashbackSum ?? zeroMoney
    : zeroMoney;

  const transferDisabled = isNotNil(frontValidationError) || isNotNil(backendError);

  return (
    <>
      <div className={classes.prizeRow}>
        <PrizeIcon width={50} height={50} />
      </div>

      <div className={classes.title}>
        {t(platformui_starzbet_bonus_cashback_cashbackWithMoney, { money: Money.toFormat(cashback, EMoneyFormat.codeRight) })}
      </div>

      <div className={classes.content}>
        <BonusDescriptionTitle descriptionTitle={descriptionTitle} />
      </div>

      <div className={clsx(classes.content, classes.bonusRules)}>
        <BonusRulesBase bonusId={bonusId} forAvailable bonusRules={bonusRules} />
      </div>

      <div className={classes.content}>
        {t(platformui_starzbet_bonus_cashback_cashbackNeedToPlayMessage)}
      </div>

      {
        isNil(backendError) && isNil(frontValidationError)
          ? (
            <div className={classes.content}>
              {t(platformui_starzbet_bonus_cashback_eligibleToReceiveMessage, { money: Money.toFormat(cashback, EMoneyFormat.codeRight) })}
            </div>
          )
          : null
      }

      {
        isNotNil(frontValidationError)
          ? (
            <div className={classes.errorContent}>
              <ValidationError {...frontValidationError} />
            </div>
          )
          : null
      }

      {
        isNotNil(backendError)
          ? (
            <div className={classes.errorContent}>
              {t(...backendError)}
            </div>
          )
          : null
      }

      <button
        className={classes.transferButton}
        disabled={transferDisabled}
        onClick={transferCashback}
      >
        {t(platformui_starzbet_bonus_cashback_transfer)}
      </button>
    </>
  );
});
CashbackContent.displayName = "CashbackContent";

interface IModal {
  onCancel: TVoidFn;
}

interface ICashbackModal extends IModal, IWithNotVipClubBonus {
  onSucceed: TVoidFn;
}

const CashbackModalContent = memo<ICashbackModal>(({ onCancel, onSucceed, notVipClubBonus }) => {
  const requestLoading = useSelector(requestCashbackSumLoadingSelector);
  const transferLoading = useSelector(transferCashbackLoadingSelector);
  const transferSucceeded = useSelector(transferCashbackSucceededSelector);

  useEffect(
    () => {
      if (transferSucceeded) {
        onSucceed();
        onCancel();
      }
    },
    [transferSucceeded],
  );

  return (
    <ThemedModal onCancel={onCancel} className={classes.container}>
      <ThemedModalHeader closeButtonClickHandler={onCancel} />

      <ThemedModalBody className={classes.modalBody}>
        {
          requestLoading || transferLoading
            ? <LoadingContent />
            : <CashbackContent notVipClubBonus={notVipClubBonus} />
        }
      </ThemedModalBody>
    </ThemedModal>
  );
});
CashbackModalContent.displayName = "CashbackModalContent";

interface ICashbackButtonBaseProps extends PropsWithChildren<IWithClassName & IWithNotVipClubBonus & IWithDisabled> {
  toggleModal: TVoidFn;
}

const CashbackButtonBase: FC<ICashbackButtonBaseProps> = ({
  toggleModal,
  className,
  children,
  notVipClubBonus,
  disabled,
}) => {
  const transferCashbackModalOpened = useActionWithBind(transferCashbackModalOpenedAction, notVipClubBonus);

  const handleClick = () => {
    toggleModal();
    transferCashbackModalOpened();
  };

  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
CashbackButtonBase.displayName = "CashbackButtonBase";

type TTKey = Readonly<Parameters<TFuncWithPlain>>;

const successTitle: TTKey = [platformui_starzbet_bonus_cashback_succeed_transferSuccessful];
const successSubitle: TTKey = [platformui_starzbet_bonus_cashback_succeed_transferSuccessfulMessage];

const CashbackSucceededModalContent = memo<IModal>(({ onCancel }) => (
  <ThemedModalSuccessMessage
    title={successTitle}
    subtitle={successSubitle}
    hideModal={onCancel}
  />
));
CashbackSucceededModalContent.displayName = "CashbackSucceededModalContent";

interface ICashbackModalProps extends PropsWithChildren<IWithClassName & IWithNotVipClubBonus & IWithDisabled> {
  toggleSucceedModal: TVoidFn;
}

const CashbackModal: FC<ICashbackModalProps> = ({
  toggleSucceedModal,
  children,
  className,
  notVipClubBonus,
  disabled,
}) => {
  const removeTransferLoading = useActionWithBind(callManagerRemoveSymbolAction, [TRANSFER_CASHBACK_CALL_SYMBOL]);

  const onCashbackModalSucceed = useCallback(
    () => {
      toggleSucceedModal();
      removeTransferLoading();
    },
    [removeTransferLoading, toggleSucceedModal],
  );

  const modal = (hideModal: TVoidFn) => (
    <CashbackModalContent
      onCancel={hideModal}
      onSucceed={onCashbackModalSucceed}
      notVipClubBonus={notVipClubBonus}
    />
  );

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggleCashbackModal: TVoidFn) => (
          <CashbackButtonBase
            toggleModal={toggleCashbackModal}
            className={className}
            notVipClubBonus={notVipClubBonus}
            disabled={disabled}
          >
            {children}
          </CashbackButtonBase>
        )
      }
    </BaseModalCreator>
  );
};
CashbackModal.displayName = "CashbackModal";

const CashbackButton = withParamCondition(
  isCashbackBonusAvailableSelector,
  ["notVipClubBonus"],
  ({
    children,
    className,
    notVipClubBonus,
    disabled = false,
  }: PropsWithChildren<IWithClassName & IWithNotVipClubBonus & Partial<IWithDisabled>>) => {
    const requestWallet = usePlayerRequestWalletAction();

    const onClose = (hideModal: TVoidFn) => () => {
      hideModal();
      requestWallet();
    };

    const modal = (hideModal: TVoidFn) => <CashbackSucceededModalContent onCancel={onClose(hideModal)} />;

    return (
      <BaseModalCreator modal={modal}>
        {
          (toggleSucceedModal: TVoidFn) => (
            <CashbackModal
              toggleSucceedModal={toggleSucceedModal}
              className={className}
              notVipClubBonus={notVipClubBonus}
              disabled={disabled}
            >
              {children}
            </CashbackModal>
          )
        }
      </BaseModalCreator>
    );
  },
);
CashbackButton.displayName = "CashbackButton";

export { CashbackButton };
