// @ts-nocheck
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { keyToComponent, type TComponent, useParamSelector } from "@sb/utils";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { sportIdByEventIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { useCurrentMarketFilterTypeList } from "../../Store/MarketFilter/MarketFilterProvider";
import { useMarketIdByTypeSelector } from "../../Store/Feed/Hooks/UseMarketIdByTypeSelector";
import { marketPresetSelector } from "../../Store/MarketFilter/Selectors/MarketFilterSelectors";
import { getMarketTypeByPreset } from "../../Store/MarketFilter/Model/MarketPreset";
import { type IMarketProps } from "../../Store/Feed/Model/Market/Market";

interface IMarketEntryContainerProps {
  type: EMarketType;
  eventId: string;
  child: TComponent<IMarketProps>;
  emptyChild: TComponent<{ type: EMarketType; }>;
}

interface IMarketContainerProps extends Omit<IMarketEntryContainerProps, "type"> {
  fit?: boolean;
}

const MarketEntryContainer = memo<IMarketEntryContainerProps>(({
  type,
  eventId,
  child,
  emptyChild,
  ...rest
}) => {
  const marketId = useMarketIdByTypeSelector(type, eventId);

  if (!marketId) {
    return emptyChild
      ? createElement(emptyChild, { type, ...rest })
      : null;
  }

  return createElement(
    child,
    {
      marketId,
      marketType: type,
      ...rest,
    },
  );
});
MarketEntryContainer.displayName = "MarketEntryContainer";

const MarketContainer = memo<IMarketContainerProps>(({ empty, ...rest }) => {
  const currentTypeList = useCurrentMarketFilterTypeList();

  if (currentTypeList.length === 0) {
    return empty
      ? createElement(empty)
      : null;
  }

  return currentTypeList.map(keyToComponent("type", rest)(MarketEntryContainer));
});
MarketContainer.displayName = "MarketContainer";

const MarketPresetContainer = memo<IMarketContainerProps>(({ empty, eventId, ...rest }) => {
  const preset = useSelector(marketPresetSelector);
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);
  const type = getMarketTypeByPreset(preset, sportId);

  if (!type) {
    return empty
      ? createElement(empty)
      : null;
  }

  return (
    <MarketEntryContainer
      type={type}
      eventId={eventId}
      {...rest}
    />
  );
});
MarketPresetContainer.displayName = "MarketPresetContainer";

export { MarketContainer, MarketPresetContainer };
