/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import Scrollbar from "react-scrollbars-custom";
import { type FC, memo, type PropsWithChildren, useCallback, useReducer } from "react";
import { useSelector } from "react-redux";
import { type IMoney, noopStopPropagation, type TExplicitAny, type TVoidFn, not } from "@sb/utils";
import {
  sportsbookui_starzbet_bet_refID,
  sportsbookui_starzbet_betSlip_bet_estimatedReturns,
  sportsbookui_starzbet_betSlip_title_totalOdds,
  sportsbookui_starzbet_betSlip_title_totalStake,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import type {
  TSportsbook_BetBonus_Fragment,
  TSportsbook_BetOddsBoost_Fragment,
  TSportsbook_Pick_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type ESportsbook_BetStatusEnum, type TMoneyTransaction_Fragment } from "@sb/graphql-client";
import classes from "./BaseBet.module.css";
import { Copy } from "../../../../../../../../platformui/Themes/Starzbet/Components/Copy/Copy";
import { When } from "../../../../../../../../common/Components/When";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { isAccumulatorHash, isSystemHash } from "../../../../../../../Store/BetSlip/Model/BetHash";
import { coefficientFormat } from "../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { type IDeprecatedBetContractFromFS } from "../../../../../../../Model/Bet";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { editingByBetIdSelector } from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { useBetRegistry } from "../BetRegistry";
import { BetRow } from "./BetRow/BetRow";
import { BetHead } from "./BetHead/BetHead";

type TCommonBet = {
  id: string;
  betStatus: ESportsbook_BetStatusEnum;
  totalStake: IMoney | TMoneyTransaction_Fragment;
  totalPayout: IMoney | TMoneyTransaction_Fragment;
  hash: string;
  picks: (TSportsbook_Pick_Fragment | TExplicitAny)[];
  betStatesCount?: number; // undefined for GQL bet
  contract?: IDeprecatedBetContractFromFS[];  // undefined for GQL bet
  cashOutAt: string | number | null;
  createdAt: string | number;
  totalPotentialPayout?: TMoneyTransaction_Fragment; // undefined for FS bet
  betOddsBoost?: TSportsbook_BetOddsBoost_Fragment | null; // undefined for FS bet
  totalPotentialCoefficient: number;
  betBonus?: TSportsbook_BetBonus_Fragment; // undefined for GQL bet;
}

interface IBaseBetProps extends TCommonBet {
  toggleModal?: TVoidFn;
  isDropDown?: boolean;
  className?: string;
}

const HeaderTotalRow: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.headerTotal}>{children}</div>
);
HeaderTotalRow.displayName = "HeaderTotalRow";

const BaseBet = memo<IBaseBetProps>(({
  isDropDown = false,
  className,
  ...bet
}) => {
  const [t] = useTranslation();

  const [expanded, toggleExpanded] = useReducer(not<boolean>, true);

  const handleToggle = useCallback(
    () => {
      if (isDropDown) {
        toggleExpanded();
      }
    },
    [isDropDown],
  );

  const {
    TotalStake,
    PickList,
    EditingContent,
    BetHistory,
    BetTotalTitle,
    BetTotalExtraContent,
    BetFooter,
    OddsBoost,
    EstimatedReturns,
  } = useBetRegistry();

  const betClassName = clsx(
    classes.bet,
    !isDropDown && classes.modal,
    classes[bet.betStatus],
    className,
  );

  const editing = useSelector(editingByBetIdSelector(bet.id));

  return (
    <div className={betClassName} onClick={noopStopPropagation}>
      <BetHead
        isDropDown={isDropDown}
        expanded={expanded}
        handleToggle={handleToggle}
        bet={bet}
      />

      {
        (expanded || editing) && (

          <div className={classes.picks}>
            {
              !isDropDown
                ? (

                  <Scrollbar className={classes.betScroll} noScrollX>
                    <PickList id={bet.id} picks={bet.picks} isDropDown={false} />
                  </Scrollbar>
                )
                : <PickList id={bet.id} picks={bet.picks} isDropDown />
            }

            {EditingContent && <EditingContent id={bet.id} />}

            {
              isDropDown && !isSystemHash(bet.hash) && BetHistory && (
                <BetHistory id={bet.id} betStatesCount={bet.betStatesCount} contract={bet.contract} />
              )
            }
          </div>
        )
      }

      {
        (expanded || editing) && (
          <>
            {BetTotalTitle && <BetTotalTitle id={bet.id} />}

            <div className={classes.betTotal}>
              <BetRow>
                <div className={classes.refIdWrapper}>
                  <Ellipsis className={classes.id}>
                    {t(sportsbookui_starzbet_bet_refID)}
                  </Ellipsis>

                  <Copy
                    text={bet.id}
                    location={"betSlip"}
                    isRight
                    className={classes.copy}
                  />
                </div>

                <Ellipsis>
                  <DateFormat date={Number(bet.createdAt)} format={"HH:mm:ss • E, do LLL"} />
                </Ellipsis>
              </BetRow>

              <BetRow>
                <Ellipsis>
                  {t(sportsbookui_starzbet_betSlip_title_totalStake)}
                </Ellipsis>

                <div className={classes.totalStakeWithLabel}>
                  <TotalStake totalStake={bet.totalStake} betBonus={bet.betBonus} />
                </div>
              </BetRow>

              <OddsBoost
                id={bet.id}
                totalPotentialPayout={bet.totalPotentialPayout}
                betOddsBoost={bet.betOddsBoost}
                totalStake={bet.totalStake}
              />

              <When condition={isAccumulatorHash(bet.hash)}>
                <BetRow>
                  <Ellipsis>{t(sportsbookui_starzbet_betSlip_title_totalOdds)}</Ellipsis>

                  <Ellipsis>{coefficientFormat(bet.totalPotentialCoefficient)}</Ellipsis>
                </BetRow>
              </When>

              <BetRow>
                <Ellipsis>{t(sportsbookui_starzbet_betSlip_bet_estimatedReturns)}</Ellipsis>

                <Ellipsis>
                  <EstimatedReturns id={bet.id} totalPotentialPayout={bet.totalPotentialPayout} />
                </Ellipsis>
              </BetRow>

              {BetTotalExtraContent && <BetTotalExtraContent id={bet.id} />}
            </div>

            {
              BetFooter && (
                <BetFooter
                  id={bet.id}
                  totalPayout={bet.totalPayout}
                  cashOutAt={bet.cashOutAt}
                  isDropDown={isDropDown}
                />
              )
            }
          </>
        )
      }
    </div>
  );
});
BaseBet.displayName = "BaseBet";

export type { IBaseBetProps };

export { HeaderTotalRow, BaseBet };
