import { memo } from "react";
import { useSelector } from "react-redux";
import { marketTypeTKeys } from "@sb/betting-core/SharedTKeys/MarketTypeTKeys";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { mainLineSchema } from "@sb/betting-core/MainLineSchema";
import { useTranslation } from "@sb/translator";
import { type TTranslateMarketArg } from "@sb/betting-core/TranslateEntity/TranslateMarket";
import { BaseMarketName } from "@sb/entity-translates";
import { type EMarketType } from "@sb/betting-core/MarketType";
import {
  getNotNil,
  isNotVoid,
  type TNullable,
  type TTranslateItem,
  type TTranslateRecord,
  type TUnknownObject,
  useParamSelector,
} from "@sb/utils";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import {
  marketByIdSelector,
  participantsByEventIdSelector,
  scopeByIdSelector,
  sportIdByEventIdSelector,
} from "../../Store/Feed/Selectors/FeedSelectors";
import { localeSelector } from "../../Store/Locale/LocaleSelector";
import { normalizeTranslatedName } from "../../Utils/NormalizeTranslatedName";
import { type TBetHistoryEventPickMarket, type TMarketType, type TScopeType } from "../../Store/MyBets/Model/TBet";

const generateScope = (sportId: string, scope?: { number: number; type: EScopeType; }): string | undefined => {
  if (scope) {
    return `${scope.type}--${scope.number}`;
  }
  const scopeType = Object.keys(mainLineSchema[sportId as keyof typeof mainLineSchema])[0];

  if (!scopeType) {
    return void 0;
  }

  return `${scopeType}--0`;
};

interface IPlainMarketNameProps {
  marketType: EMarketType;
  sportId: string;
}

const PlainMarketName = memo<IPlainMarketNameProps>(({
  marketType,
  sportId,
}) => {
  const [t] = useTranslation();

  const sport = getNotNil(sportIdToCodeMap[sportId], ["PlainMarketName", sportId], "sportCode") as string;
  const scope = generateScope(sportId);

  const context: Record<string, string> = scope ? { sport, scope } : { sport };

  return t(marketTypeTKeys[marketType], { context });
});
PlainMarketName.displayName = "PlainMarketName";

interface IMarketNameByParamsProps {
  market: {
    translatesForManuallyCreated?: TNullable<TTranslateRecord | TTranslateItem[]>;
    type: EMarketType | TMarketType;
    parameters: TUnknownObject | TBetHistoryEventPickMarket["parameters"];

  };
  scope: {
    number: number;
    type: EScopeType | TScopeType;
  };
  participants: TParticipants;
  sportId: string;
}

const MarketNameByParams = memo<IMarketNameByParamsProps>(({
  market,
  scope,
  participants,
  sportId,
}) => {
  const locale = useSelector(localeSelector);

  const translateMarketArg: TTranslateMarketArg = {
    locale,
    type: market.type as EMarketType,
    parameters: market.parameters,
    name: isNotVoid(market.translatesForManuallyCreated) ? normalizeTranslatedName(market.translatesForManuallyCreated) : null,
    participants,
    sportCode: getNotNil(sportIdToCodeMap[sportId], ["MarketNameByParams", sportId], "sportCode"),
    scopeType: scope.type as EScopeType,
    scopeNumber: scope.number,
  };

  return <BaseMarketName {...translateMarketArg} />;
});
MarketNameByParams.displayName = "MarketNameByParams";

const MarketName = memo<IWithId>(({ id }) => {
  const market = useParamSelector(marketByIdSelector, [id]);
  const participants = useParamSelector(participantsByEventIdSelector, [market.eventId]);
  const sportId = useParamSelector(sportIdByEventIdSelector, [market.eventId]);
  const scope = useParamSelector(scopeByIdSelector, [market.scopeId]);

  return (
    <MarketNameByParams
      market={market}
      scope={scope}
      participants={participants}
      sportId={sportId}
    />
  );
});
MarketName.displayName = "MarketName";

export {
  PlainMarketName,
  MarketNameByParams,
  MarketName,
};
