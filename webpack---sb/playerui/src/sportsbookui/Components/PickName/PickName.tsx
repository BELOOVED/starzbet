import { memo } from "react";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { marketGroupsWithTotal, marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type TExplicitAny, type TNullable, type TTranslateItem, type TTranslateRecord } from "@sb/utils";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { marketTypesWithHandicap } from "../../Store/Feed/Model/Market/Market";
import { sportIdsWithoutScope } from "../../Store/Virtual/Common/Model/SportIdWithoutScope";
import { type TMarketType, type TScopeType } from "../../Store/MyBets/Model/TBet";
import { ShortScopeName } from "../ScopeName/ScopeName";
import { OutcomeProp } from "../OutcomeProp/OutcomeProp";
import { OutcomeName } from "../OutcomeName/OutcomeName";

const marketGroupsWithNumberYesNo = [
  EMarketGroup.range_number_yes_no,
  EMarketGroup.range_number_yes_no_team,
  EMarketGroup.exact_number_yes_no,
  EMarketGroup.exact_number_yes_no_team,
];

interface IOutcomeNameWithProps {
  collapsed: boolean;
  marketType: EMarketType | TMarketType;
  marketParameters: Record<string, TExplicitAny>;
  outcomeParameters: Record<string, TExplicitAny>;
  participants: TParticipants;
  sportId: string;
  name?: TTranslateRecord | TTranslateItem[] | null;
}

const OutcomeNameWithProp = memo<IOutcomeNameWithProps>(({
  sportId,
  marketType,
  marketParameters,
  outcomeParameters,
  participants,
  collapsed,
  name,
}) => {
  const marketGroup = marketTypeToMarketGroupMap[marketType as EMarketType];

  if (marketGroupsWithNumberYesNo.includes(marketGroup)) {
    return (
      <OutcomeProp
        marketType={marketType}
        outcomeParameters={outcomeParameters}
        marketParameters={marketParameters}
        participants={participants}
      />
    );
  }

  if (marketTypesWithHandicap.includes(marketType)) {
    return (
      <>
        <OutcomeName
          marketType={marketType}
          sportId={sportId}
          outcomeParameters={outcomeParameters}
          marketParameters={marketParameters}
          participants={participants}
          name={name}
        />

        {" ("}

        <OutcomeProp
          marketType={marketType}
          outcomeParameters={outcomeParameters}
          marketParameters={marketParameters}
          participants={participants}
        />

        {")"}
      </>
    );
  }

  if (marketGroupsWithTotal.includes(marketGroup)) {
    return (
      <>
        <OutcomeName
          marketType={marketType}
          sportId={sportId}
          outcomeParameters={outcomeParameters}
          marketParameters={marketParameters}
          participants={participants}
          name={name}
        />

        {` (${marketParameters?.total})`}
      </>
    );
  }

  return (
    <OutcomeName
      marketType={marketType}
      sportId={sportId}
      outcomeParameters={outcomeParameters}
      marketParameters={marketParameters}
      participants={participants}
      collapsed={collapsed}
      name={name}
    />
  );
});
OutcomeNameWithProp.displayName = "OutcomeNameWithProp";

interface IPickNameProps {
  collapsed?: boolean;
  marketType: EMarketType | TMarketType;
  marketParameters: Record<string, TExplicitAny>;
  outcomeParameters: Record<string, TExplicitAny>;
  participants: TParticipants;
  scope: { number: number; type: EScopeType | TScopeType; };
  sportId: string;
  name?: TNullable<TTranslateRecord | TTranslateItem[]>;
}

const PickName = memo<IPickNameProps>(({
  collapsed = false,
  marketType,
  marketParameters,
  outcomeParameters,
  participants,
  scope,
  sportId,
  name,
}) => {
  if (sportIdsWithoutScope.includes(sportId)) {
    return (
      <OutcomeNameWithProp
        collapsed={collapsed}
        sportId={sportId}
        marketType={marketType}
        marketParameters={marketParameters}
        outcomeParameters={outcomeParameters}
        participants={participants}
        name={name}
      />
    );
  }

  return (
    <>
      <OutcomeNameWithProp
        collapsed={collapsed}
        sportId={sportId}
        marketType={marketType}
        marketParameters={marketParameters}
        outcomeParameters={outcomeParameters}
        participants={participants}
        name={name}
      />

      {" ("}

      <ShortScopeName scope={scope} sportId={sportId} />

      {")"}
    </>
  );
});
PickName.displayName = "PickName";

export { PickName };
