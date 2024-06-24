import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { type ESportsbook_BetStatusEnum, type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { EMoneyFormat, type IMoney, Money, type TVoidFn } from "@sb/utils";
import {
  sportsbookui_starzbet_bet_refID,
  sportsbookui_starzbet_betSlip_bet_estimatedReturns,
  sportsbookui_starzbet_betSlip_title_totalStake,
  sportsbookui_starzbet_title_casinoBet,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BaseBet.module.css";
import { TranslateRecord } from "../../../../../../../../platformui/Components/TranslateRecord/TranslateRecord";
import { Copy } from "../../../../../../../../platformui/Themes/Starzbet/Components/Copy/Copy";
import { CloseIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { betStatusTKeys } from "../../../../../../../Store/MyBets/Model/BetStatusEnum";
import { HeaderTotalRow } from "./BaseBet";
import { BetRow } from "./BetRow/BetRow";
import { ContributionRow } from "./ContributionRow/ContributionRow";

interface ICasinoBetProps {
  id: string;
  status: ESportsbook_BetStatusEnum;
  stake: IMoney;
  payout: IMoney;
  name: TTranslateRecord_Fragment[];
  createdAt: string | number | undefined;
  contribution?: IMoney; // just for wagering

  toggleModal?: TVoidFn;
  className?: string;
}

const CasinoBet = memo<ICasinoBetProps>(({
  id,
  status,
  payout,
  stake,
  name,
  createdAt,
  toggleModal,
  contribution,
  className,
}) => {
  const [t] = useTranslation();

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={clsx(classes.bet, classes[status], classes.centering, classes.modal, className)}>
      <div className={classes.betContainer}>
        <div className={classes.detailsEvent}>
          <div className={classes.eventTitle}>{t(sportsbookui_starzbet_title_casinoBet)}</div>

          <CloseIcon className={classes.closePage} onClick={toggleModal} size={"xs"} />
        </div>

        <div className={classes.head}>
          <div className={classes.moneyTypeWrapper}>
            <div className={classes.money}>
              {Money.toFormat(stake, EMoneyFormat.symbolLeft)}
            </div>
          </div>

          <div className={classes.headerWrapper}>
            <div className={clsx(classes.status, classes[status])}>
              <div className={classes.statusText}>
                {t(betStatusTKeys[status])}
              </div>

              <HeaderTotalRow>
                {Money.toFormat(payout, EMoneyFormat.symbolLeft)}
              </HeaderTotalRow>
            </div>
          </div>
        </div>

        <TranslateRecord record={name} />
      </div>

      <div className={classes.betTotal}>
        <BetRow>
          <div className={classes.refIdWrapper}>
            <div>
              {t(sportsbookui_starzbet_bet_refID)}

              {": "}
            </div>

            <div className={classes.id}>{id}</div>

            <Copy text={id} />
          </div>

          <div className={classes.createdAt}>
            {
              createdAt
                ? <DateFormat date={Number(createdAt)} format={"HH:mm:ss • E, do LLL"} />
                : "-"
            }
          </div>
        </BetRow>

        <BetRow>
          <div>
            {t(sportsbookui_starzbet_betSlip_title_totalStake)}
          </div>

          <div>
            {Money.toFormat(stake, EMoneyFormat.symbolLeft)}
          </div>
        </BetRow>

        <BetRow>
          <span>{t(sportsbookui_starzbet_betSlip_bet_estimatedReturns)}</span>

          <span>
            {Money.toFormat(payout, EMoneyFormat.symbolLeft)}
          </span>
        </BetRow>

        {contribution && <ContributionRow contribution={contribution} />}
      </div>
    </div>
  );
});
CasinoBet.displayName = "CasinoBet";

export { CasinoBet };
