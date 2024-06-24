import { type ComponentType } from "react";
import { Registry, useRegistry } from "@bem-react/di";
import { type TExplicitAny } from "@sb/utils";
import { type INormalizedEventPick, type INormalizedOutrightPick } from "../../../../../../../common/Utils/NormalizePick";

interface IEventPickRegistry { // TExplicitAny for frontServer data types
  PickName: ComponentType<INormalizedEventPick | TExplicitAny>;
  MarketName: ComponentType<Pick<INormalizedEventPick, "market" | "event"> | TExplicitAny>;
  ShortScopeName: ComponentType<Pick<INormalizedEventPick, "market" | "event"> | TExplicitAny>;
  Teams: ComponentType<Pick<INormalizedEventPick, "event"> | TExplicitAny>;
  EventStatus: ComponentType<Pick<INormalizedEventPick, "event" | "eventInfo"> | TExplicitAny>;
}

interface IOutrightPickRegistry { // TExplicitAny for frontServer data types
  OutrightOutcomeName: ComponentType<Pick<INormalizedOutrightPick, "outcome"> | TExplicitAny>;
}

const EVENT_PICK_REGISTRY_ID = "event_pick_registry";
const OUTRIGHT_PICK_REGISTRY_ID = "outright_pick_registry";

const eventPickRegistry = () => new Registry({ id: EVENT_PICK_REGISTRY_ID, overridable: false });
const outrightPickRegistry = () => new Registry({ id: OUTRIGHT_PICK_REGISTRY_ID, overridable: false });

const useEventPickRegistry = () => useRegistry<IEventPickRegistry>(EVENT_PICK_REGISTRY_ID);
const useOutrightPickRegistry = () => useRegistry<IOutrightPickRegistry>(OUTRIGHT_PICK_REGISTRY_ID);

export {
  eventPickRegistry,
  outrightPickRegistry,
  useEventPickRegistry,
  useOutrightPickRegistry,
};
