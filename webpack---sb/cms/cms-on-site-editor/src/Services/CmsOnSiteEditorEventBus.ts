import { EventBusWithState } from "@sb/event-bus";

type TEvents = {
  EDITOR_MODE: [boolean];
  INSPECT_MODE: [boolean];
  OPEN_ITEM: [string[]];
}

const cmsOnSiteEditorEventBus = new EventBusWithState<TEvents>();

export {
  cmsOnSiteEditorEventBus,
};
