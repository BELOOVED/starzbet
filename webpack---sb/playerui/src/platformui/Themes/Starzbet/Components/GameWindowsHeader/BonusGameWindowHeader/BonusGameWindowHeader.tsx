/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { type FC, memo, type PropsWithChildren, type ReactNode, useReducer } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, isNotNil, Money, not, type TVoidFn } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_button_gotIt,
  platformui_starzbet_menu_title_bonusBalance,
  platformui_starzbet_menu_title_freeBetBalance,
  platformui_starzbet_playGame_bonusHeader_bonus,
  platformui_starzbet_playGame_bonusHeader_info,
  platformui_starzbet_playGame_bonusRule_headerTitle,
  platformui_starzbet_playGame_bonusRule_maxAmountOfBets,
  platformui_starzbet_playGame_bonusRule_maxStakePerBet,
  platformui_starzbet_playGame_bonusRule_minNumberOfBets,
  platformui_starzbet_playGame_bonusRule_minStakePerBet,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import commonClasses from "../GameWindowHeader.module.css";
import classes from "./BonusGameWindowHeader.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Space } from "../../../../../../common/Components/Space/Space";
import {
  activeBonusNameForGameHeaderSelector,
  activeBonusWalletForGameHeaderSelector,
  matchedBonusDataSelector,
} from "../../../../../Store/PlayGame/BonusMatchedWithGameSelectors";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { GAME_WINDOW_HEADER_STYLE_V1 } from "../../../../../Utils/GameWindowUtils";
import { bonusWageringProgressSelector } from "../../../../../Store/BonusEvents/BonusEventsSelector";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalButtonsRow } from "../../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalButton } from "../../ThemedModal/ThemedModalButton/ThemedModalButton";
import { ThemedModalTextBlock } from "../../ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { HeaderWageringProgress } from "../../Bonuses/HeaderWageringProgress/HeaderWageringProgress";

interface IRuleProps {
  title: ReactNode;
}

const Rule: FC<PropsWithChildren<IRuleProps>> = ({ title, children }) => (
  <span>
    {title}

    {": "}

    {children}
  </span>
);
Rule.displayName = "Rule";

interface IBonusInfoProps {
  toggleModalVisible: TVoidFn;
}

const BonusInfo = memo<IBonusInfoProps>(() => {
  const [t] = useTranslation();

  const bonusData = useSelector(matchedBonusDataSelector);

  return (
    <Space value={8} vertical>
      {
        bonusData.minStakePerBet
          ? (
            <Rule title={t(platformui_starzbet_playGame_bonusRule_minStakePerBet)}>
              {Money.toFormat(bonusData.minStakePerBet, EMoneyFormat.symbolLeft)}
            </Rule>
          )
          : null
      }

      {
        bonusData.minValue
          ? (
            <Rule title={t(platformui_starzbet_playGame_bonusRule_minStakePerBet)}>
              {Money.toFormat(bonusData.minValue, EMoneyFormat.symbolLeft)}
            </Rule>
          )
          : null
      }

      {
        bonusData.maxStakePerBet
          ? (
            <Rule title={t(platformui_starzbet_playGame_bonusRule_maxStakePerBet)}>
              {Money.toFormat(bonusData.maxStakePerBet, EMoneyFormat.symbolLeft)}
            </Rule>
          )
          : null
      }

      {
        bonusData.maxValue
          ? (
            <Rule title={t(platformui_starzbet_playGame_bonusRule_maxStakePerBet)}>
              {Money.toFormat(bonusData.maxValue, EMoneyFormat.symbolLeft)}
            </Rule>
          )
          : null
      }

      {
        bonusData.minNumberOfBets
          ? (
            <Rule title={t(platformui_starzbet_playGame_bonusRule_minNumberOfBets)}>
              {bonusData.minNumberOfBets}
            </Rule>
          )
          : null
      }

      {
        bonusData.maxAmountOfBets
          ? (
            <Rule title={t(platformui_starzbet_playGame_bonusRule_maxAmountOfBets)}>
              {bonusData.maxAmountOfBets}
            </Rule>
          )
          : null
      }
    </Space>
  );
});
BonusInfo.displayName = "BonusInfo";

interface IBalanceBlockProps {
  title: ReactNode;
}

const BalanceBlock: FC<PropsWithChildren<IBalanceBlockProps>> = ({ title, children }) => (
  <div className={classes.block}>
    <Ellipsis className={classes.titleAmount}>
      {title}

      {": "}
    </Ellipsis>

    <Ellipsis className={classes.amount}>
      {children}
    </Ellipsis>
  </div>
);
BalanceBlock.displayName = "BalanceBlock";

const BonusInfoModal = memo<IBonusInfoProps>(({ toggleModalVisible }) => {
  const [t] = useTranslation();

  return (
    <ThemedModal onCancel={toggleModalVisible} className={classes.modal} disableLockBodyScroll>
      <ThemedModalHeader closeButtonClickHandler={toggleModalVisible}>
        {t(platformui_starzbet_playGame_bonusRule_headerTitle)}
      </ThemedModalHeader>

      <ThemedModalTextBlock>
        <BonusInfo toggleModalVisible={toggleModalVisible} />
      </ThemedModalTextBlock>

      <ThemedModalButtonsRow>
        <ThemedModalButton onClick={toggleModalVisible}>
          {t(platformui_starzbet_button_gotIt)}
        </ThemedModalButton>
      </ThemedModalButtonsRow>
    </ThemedModal>
  );
});
BonusInfoModal.displayName = "BonusInfoModal";

const BonusGameWindowHeader = memo(() => {
  const [t] = useTranslation();

  const { bonusWallet, freeBetWallet } = useSelector(activeBonusWalletForGameHeaderSelector);
  const name = useSelector(activeBonusNameForGameHeaderSelector);

  const bonusWalletBalance = bonusWallet?.balance;
  const freeBetWalletBalance = freeBetWallet?.balance;
  const wagerProgress = useSelector(bonusWageringProgressSelector);
  const [modalVisible, toggleModalVisible] = useReducer(not<boolean>, false);

  return (
    <div className={clsx(commonClasses.gameWindowHeader, classes.bonusHeader)} style={GAME_WINDOW_HEADER_STYLE_V1}>
      {modalVisible ? <BonusInfoModal toggleModalVisible={toggleModalVisible} /> : null}

      <div className={classes.title}>
        {t(platformui_starzbet_playGame_bonusHeader_bonus)}

        {": "}

        <Ellipsis>
          <TranslateRecord record={name} />
        </Ellipsis>
      </div>

      {
        isNotNil(wagerProgress)
          ? <HeaderWageringProgress currentProgress={wagerProgress} className={classes.progress} />
          : null
      }

      <div className={classes.headerPostfix}>
        {
          isNotNil(bonusWalletBalance) && (
            <BalanceBlock title={t(platformui_starzbet_menu_title_bonusBalance)}>
              {Money.toFormat(bonusWalletBalance, EMoneyFormat.symbolLeft)}
            </BalanceBlock>
          )
        }

        {
          isNotNil(freeBetWalletBalance) && (
            <BalanceBlock title={t(platformui_starzbet_menu_title_freeBetBalance)}>
              {Money.toFormat(freeBetWalletBalance, EMoneyFormat.symbolLeft)}
            </BalanceBlock>
          )
        }

        <Button onClick={toggleModalVisible} colorScheme={"orange-gradient"} className={classes.infoButton}>
          {t(platformui_starzbet_playGame_bonusHeader_info)}
        </Button>
      </div>
    </div>
  );
});
BonusGameWindowHeader.displayName = "BonusGameWindowHeader";

export { BonusGameWindowHeader };
