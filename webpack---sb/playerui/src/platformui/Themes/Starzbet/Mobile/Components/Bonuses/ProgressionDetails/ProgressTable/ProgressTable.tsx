import { type ComponentType, memo } from "react";
import { type TTFuncParameters, useTranslation } from "@sb/translator";
import {
  EMoneyFormat,
  getNotNil,
  type IMoney,
  isNotNil,
  Money,
  notNil,
  type TVoidFn,
  useActionWithBind,
  withProps,
} from "@sb/utils";
import {
  platformui_starzbet_bonus_progressionTable_contribution,
  platformui_starzbet_bonus_progressionTable_freeBetNumber,
  platformui_starzbet_bonus_progressionTable_freeSpinNumber,
  platformui_starzbet_bonus_progressionTable_info,
  platformui_starzbet_bonus_progressionTable_noData,
  platformui_starzbet_bonus_progressionTable_progress,
  platformui_starzbet_bonus_progressionTable_stake,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EBonusProductEnum, type EPlatform_PlayerBonusPhaseEnum, ESportsbook_BetStatusEnum } from "@sb/graphql-client";
import classes from "./ProgressTable.module.css";
import {
  BetFromGQL,
} from "../../../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/BetSlip/Bet/BetFromGQL/BetFromGQL";
import {
  CasinoBet,
} from "../../../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/BetSlip/Bet/BaseBet/CasinoBet";
import {
  ContributionRow,
} from "../../../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/BetSlip/Bet/BaseBet/ContributionRow/ContributionRow";
import { Empty } from "../../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { Loader } from "../../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { type IDeprecatedProgressData } from "../../../../../../../Store/Bonuses/Utils/DeprecatedBonusResourcesUtils";
import { deprecatedBonusesLoadBonusResourceByIdAction } from "../../../../../../../Store/Bonuses/BonusesActions";
import { EBonusProgressTable } from "../../../../../../../Store/Bonuses/Model/Enums/EBonusProgressTable";
import {
  type IDeprecatedExtendedProgressionDetailsData,
} from "../../../../../../../Store/Bonuses/Selectors/DeprecatedBonusResourcesSelectors";
import { PRODUCT_TRANSLATE_MAP } from "../../../../../Model/Bonus/BonusMaps";
import { type IModalCreatorComponentProps, ModalCreator } from "../../../ModalCreator/ModalCreator";
import { BonusResourcePaginator } from "./BonusResourcePaginator/BonusResourcePaginator";

interface IBetInfoModalProps extends IModalCreatorComponentProps {
  data: IDeprecatedProgressData;
  showContribution: boolean;
}

const BetInfoModal = memo<IBetInfoModalProps>(({ onCancel, data, showContribution }) => {
  if (!data.payload) {
    return <Loader />;
  }

  const contribution = showContribution && notNil(data.contributionPct)
    ? Money.multiply(data.stake, data.contributionPct / 100)
    : undefined;

  if (data.payload.__typename === "Platform_SportsbookBetRequestBatchData") {
    const firstBet = getNotNil(data.payload.bets[0], ["BetInfoModal", "Platform_SportsbookBetRequestBatchData"], "firstBet");
    const bet = getNotNil(firstBet.bet.sportsbookBet, ["BetInfoModal", "Platform_SportsbookBetRequestBatchData"], "bet");

    const extraRegistry = showContribution
      ? { BetTotalExtraContent: withProps(ContributionRow)({ contribution }) }
      : undefined;

    return (
      <BetFromGQL
        extraRegistry={extraRegistry}
        {...bet}
        toggleModal={onCancel}
        className={classes.removeCentering}
      />
    );
  }

  const status = Money.notZeroAndValid(data.payout)
    ? ESportsbook_BetStatusEnum.win
    : ESportsbook_BetStatusEnum.loss;

  return (
    <CasinoBet
      toggleModal={onCancel}
      // @ts-ignore
      name={data.payload.game.name}
      payout={data.payout}
      stake={data.stake}
      status={status}
      id={data.betId}
      createdAt={data.heldAt}
      contribution={contribution}
      className={classes.removeCentering}
    />
  );
});
BetInfoModal.displayName = "BetInfoModal";

interface ICardHeaderProps {
  data: IDeprecatedProgressData;
  heldAt: string | undefined;
  BetInfoModal: ComponentType<IModalCreatorComponentProps>;
  playerBonusId: string;
  phase: EPlatform_PlayerBonusPhaseEnum;
  product?: EBonusProductEnum;
}

const CardHeader = memo<ICardHeaderProps>(({
  product,
  heldAt,
  BetInfoModal,
  playerBonusId,
  phase,
  data,
}) => {
  const [t] = useTranslation();
  const loadBonusResourceById = useActionWithBind(deprecatedBonusesLoadBonusResourceByIdAction, playerBonusId, data.id, phase, product);

  return (
    <div className={classes.cardHeader} onClick={loadBonusResourceById}>
      <div className={classes.cardHeaderLeft}>
        <div className={classes.dataRow}>
          {t(PRODUCT_TRANSLATE_MAP[data.product])}
        </div>

        <div className={classes.dataRow}>
          <DateFormat date={heldAt} format={"dd.MM.yyyy - HH:mm:ss"} />
        </div>
      </div>

      {
        data.product === EBonusProductEnum.sports
          ? (
            <ModalCreator component={BetInfoModal} childrenContainerClassName={classes.modalChildrenContainer}>
              {
                (toggleModal: TVoidFn) => (
                  <div className={classes.infoButton} onClick={toggleModal}>
                    {t(platformui_starzbet_bonus_progressionTable_info)}
                  </div>
                )
              }
            </ModalCreator>
          )
          : null
      }
    </div>
  );
});
CardHeader.displayName = "CardHeader";

interface IWageringCardBodyProps {
  stake: IMoney;
  contributionPct?: number;
  currentPercentage?: number;
}

const WageringCardBody = memo<IWageringCardBodyProps>(({ stake, contributionPct, currentPercentage }) => {
  const [t] = useTranslation();

  return (
    <table className={classes.cardBodyTable}>
      <tr>
        <th>{t(platformui_starzbet_bonus_progressionTable_stake)}</th>

        <th>{t(platformui_starzbet_bonus_progressionTable_contribution)}</th>

        <th>{t(platformui_starzbet_bonus_progressionTable_progress)}</th>
      </tr>

      <tr>
        <td>
          {Money.toFormat(stake, EMoneyFormat.symbolLeft)}
        </td>

        <td>
          {isNotNil(contributionPct) ? `${contributionPct}%` : "-"}
        </td>

        <td>
          {isNotNil(currentPercentage) ? `${currentPercentage}%` : "-"}
        </td>
      </tr>
    </table>
  );
});
WageringCardBody.displayName = "WageringCardBody";

interface IFreeBetCardBodyProps {
  titleTKeyParams: TTFuncParameters;
  stake: IMoney;
  freeBetNumber?: number;
}

const FreeBetCardBodyBase = memo<IFreeBetCardBodyProps>(({ stake, freeBetNumber, titleTKeyParams }) => {
  const [t] = useTranslation();

  return (
    <table className={classes.cardBodyTable}>
      <tr>
        <th>{t(platformui_starzbet_bonus_progressionTable_stake)}</th>

        <th>{t(...titleTKeyParams)}</th>
      </tr>

      <tr>
        <td>
          {Money.toFormat(stake, EMoneyFormat.symbolLeft)}
        </td>

        <td>
          {freeBetNumber ?? "-"}
        </td>
      </tr>
    </table>
  );
});
FreeBetCardBodyBase.displayName = "FreeBetCardBodyBase";

const FreeSpinsCardBody = withProps(FreeBetCardBodyBase)({
  titleTKeyParams: [platformui_starzbet_bonus_progressionTable_freeSpinNumber],
});

const FreeBetCardBody = withProps(FreeBetCardBodyBase)({
  titleTKeyParams: [platformui_starzbet_bonus_progressionTable_freeBetNumber],
});

interface IBonusWageringProgressTableProps {
  data: IDeprecatedExtendedProgressionDetailsData;
  playerBonusId: string;
}

const BonusWageringProgressTable = memo<IBonusWageringProgressTableProps>(({ data, playerBonusId }) => (
  <div className={classes.progressTable}>
    {
      data.records.map((it) => (
        <div className={classes.card} key={it.id}>
          <CardHeader
            data={it}
            heldAt={it.heldAt}
            BetInfoModal={withProps(BetInfoModal)({ data: it, showContribution: true })}
            playerBonusId={playerBonusId}
            phase={data.phase}
            product={data.product}
          />

          <WageringCardBody
            stake={it.stake}
            currentPercentage={it.currentPercentage}
            contributionPct={it.contributionPct}
          />
        </div>
      ))
    }

    <BonusResourcePaginator
      pageInfo={data.pageInfo}
      phase={data.phase}
      product={data.product}
      id={playerBonusId}
    />
  </div>
));
BonusWageringProgressTable.displayName = "BonusWageringProgressTable";

interface IBonusFreeBetProgressTableProps {
  data: IDeprecatedExtendedProgressionDetailsData;
  playerBonusId: string;
}

const BonusFreeBetProgressTable = memo<IBonusFreeBetProgressTableProps>(({ data, playerBonusId }) => (
  <div className={classes.progressTable}>
    {
      data.records.map((it) => (
        <div className={classes.card} key={it.id}>
          <CardHeader
            data={it}
            heldAt={it.heldAt}
            BetInfoModal={withProps(BetInfoModal)({ data: it, showContribution: false })}
            playerBonusId={playerBonusId}
            phase={data.phase}
            product={data.product}
          />

          <FreeBetCardBody
            stake={it.stake}
            freeBetNumber={it.freeBetNumber}
          />
        </div>
      ))
    }

    <BonusResourcePaginator
      pageInfo={data.pageInfo}
      phase={data.phase}
      product={data.product}
      id={playerBonusId}
    />
  </div>
));
BonusFreeBetProgressTable.displayName = "BonusFreeBetProgressTable";

interface IBonusFreeBetProgressTableProps {
  data: IDeprecatedExtendedProgressionDetailsData;
  playerBonusId: string;
}

const BonusFreeSpinsProgressTable = memo<IBonusFreeBetProgressTableProps>(({ data, playerBonusId }) => (
  <div className={classes.progressTable}>
    {
      data.records.map((it) => (
        <div className={classes.card} key={it.id}>
          <CardHeader
            data={it}
            heldAt={it.heldAt}
            BetInfoModal={withProps(BetInfoModal)({ data: it, showContribution: false })}
            playerBonusId={playerBonusId}
            phase={data.phase}
            product={data.product}
          />

          <FreeSpinsCardBody
            stake={it.stake}
            freeBetNumber={it.freeBetNumber}
          />
        </div>
      ))
    }

    <BonusResourcePaginator
      pageInfo={data.pageInfo}
      phase={data.phase}
      product={data.product}
      id={playerBonusId}
    />
  </div>
));
BonusFreeSpinsProgressTable.displayName = "BonusFreeSpinsProgressTable";

interface IBonusProgressTableProps {
  data: IDeprecatedExtendedProgressionDetailsData;
  playerBonusId: string;
}

const BonusProgressTable = memo<IBonusProgressTableProps>(({ data, playerBonusId }) => {
  if (data.loading) {
    return <Loader />;
  }

  if (data.records.length === 0) {
    return <Empty messageTKey={platformui_starzbet_bonus_progressionTable_noData} />;
  }

  switch (data.type) {
    case EBonusProgressTable.bonus: {
      return (
        <BonusWageringProgressTable data={data} playerBonusId={playerBonusId} />
      );
    }
    case EBonusProgressTable.freeBet: {
      return (
        <BonusFreeBetProgressTable data={data} playerBonusId={playerBonusId} />
      );
    }
    case EBonusProgressTable.freeSpins: {
      return (
        <BonusFreeSpinsProgressTable data={data} playerBonusId={playerBonusId} />
      );
    }
    default: {
      throw new Error("[BonusProgressTable] unknown progressData type");
    }
  }
});
BonusProgressTable.displayName = "BonusProgressTable";

export { BonusProgressTable };
