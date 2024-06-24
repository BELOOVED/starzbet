// @ts-nocheck
import { type CElement, type Component, createElement, type FC, memo, type NamedExoticComponent } from "react";
import { EMarketType } from "@sb/betting-core/MarketType";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { type TExplicitAny, useParamSelector } from "@sb/utils";
import {
  marketByIdSelector,
  marketParametersByIdSelector,
  marketTypeByIdSelector,
  outcomeParametersByIdSelector,
  outcomeTranslatesByIdSelector,
  participantsByMarketIdSelector,
  sportIdByEventIdSelector,
} from "../../Store/Feed/Selectors/FeedSelectors";
import { useCorrectScoreGroupByMarketHashSelector } from "../../Store/Feed/Hooks/UseCorrectScoreGroupByMarketHashSelector";
import { OutcomeProp } from "../../Components/OutcomeProp/OutcomeProp";
import { OutcomeName } from "../../Components/OutcomeName/OutcomeName";
import { outcomesByMarketIdSelector } from "../../Store/Feed/Selectors/OutcomesByMarketIdSelector";
import { type IOutcomeProps } from "../../Store/Feed/Model/Market/Market";
import { CoefficientContainer } from "../CoefficientContainer/CoefficientContainer";

const OutcomeCorrectScoreContainer = memo(({
  marketId,
  view,
  marketType,
  ...rest
}) => {
  const entries = useCorrectScoreGroupByMarketHashSelector(marketId);

  if (entries.length === 0) {
    return null;
  }

  return createElement(
    view,
    {
      entries,
      marketId,
      marketType,
      ...rest,
    },
  );
});
OutcomeCorrectScoreContainer.displayName = "OutcomeCorrectScoreContainer";

const OutcomeBaseMarketTypeContainer = memo(({
  marketId,
  view,
  marketType,
  ...rest
}) => {
  const entries = useParamSelector(outcomesByMarketIdSelector, [marketId]);

  if (entries.length === 0) {
    return null;
  }

  return createElement(
    view,
    {
      entries,
      marketId,
      marketType,
      ...rest,
    },
  );
});
OutcomeBaseMarketTypeContainer.displayName = "OutcomeBaseMarketTypeContainer";

interface IBaseOutcomeContainer {
  contentView: NamedExoticComponent<TExplicitAny>;
  marketId: string;
  marketType: EMarketType | undefined;
  fit?: boolean;
}

const BaseOutcomeContainer = memo<IBaseOutcomeContainer>(({
  marketId,
  contentView,
  fit,
  ...rest
}) => {
  const marketParameters = useParamSelector(marketParametersByIdSelector, [marketId]);

  return (
    <OutcomeBaseMarketTypeContainer
      marketId={marketId}
      marketParameters={marketParameters}
      view={contentView}
      fit={fit}
      {...rest}
    />
  );
});
BaseOutcomeContainer.displayName = "BaseOutcomeContainer";

type TChildren = (props: IOutcomeProps) => CElement<IOutcomeProps, Component<IOutcomeProps>>

interface IOutcomeContentContainerProps {
  id: string;
  marketId: string;
  marketType: EMarketType;
  excludeShort?: boolean;
  forceShort?: boolean;
  children: TChildren;
}

const OutcomeContentContainer: FC<IOutcomeContentContainerProps> = ({
  id,
  marketId,
  marketType,
  children,
  excludeShort,
  forceShort,
  ...rest
}) => {
  const market = useParamSelector(marketByIdSelector, [marketId]);
  const sportId = useParamSelector(sportIdByEventIdSelector, [market.eventId]);
  const participants = useParamSelector(participantsByMarketIdSelector, [marketId]);
  const outcomeParameters = useParamSelector(outcomeParametersByIdSelector, [id, marketId, "OutcomeContentContainer"]);
  const outcomeTranslates = useParamSelector(outcomeTranslatesByIdSelector, [id]);

  const name = (
    <OutcomeName
      sportId={sportId}
      marketType={marketType}
      outcomeParameters={outcomeParameters}
      marketParameters={market.parameters}
      name={outcomeTranslates}
      participants={participants}
    />
  );

  const prop = (
    <OutcomeProp
      marketType={marketType}
      outcomeParameters={outcomeParameters}
      marketParameters={market.parameters}
      participants={participants}
      excludeShort={excludeShort}
      forceShort={forceShort}
    />
  );

  return (
    <CoefficientContainer id={id}>
      {
        (props) => children({
          ...props,
          name,
          prop,
          ...rest,
        })
      }
    </CoefficientContainer>
  );
};
OutcomeContentContainer.displayName = "OutcomeContentContainer";

const containerMap = {
  [EMarketType.score_cs]: OutcomeCorrectScoreContainer,
};

const OutcomeContainer = memo(({ marketId, viewMap, ...rest }) => {
  const marketType = useParamSelector(marketTypeByIdSelector, [marketId]);

  const marketGroup = marketTypeToMarketGroupMap[marketType];
  const view = viewMap?.[marketGroup] ?? viewMap.base;

  const container = containerMap[marketType] ?? OutcomeBaseMarketTypeContainer;

  return createElement(
    container,
    {
      marketId,
      marketType,
      view,
      ...rest,
    },
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

export {
  BaseOutcomeContainer,
  OutcomeContentContainer,
  OutcomeContainer,
};
