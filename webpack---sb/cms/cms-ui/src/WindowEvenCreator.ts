import { Subject } from "rxjs";
import { EAffiliateBlockMap, EPlatformBlockMap } from "@sb/cms-core";
import { type TNil } from "@sb/utils";

const BLOCK_TYPES = new Set(
  ...Object.values(EPlatformBlockMap),
  ...Object.values(EAffiliateBlockMap),
);

const BLOCK_TYPES_EVENTS_MAP = new Map<string, Event>();

BLOCK_TYPES.forEach(
  (blockType) => {
    BLOCK_TYPES_EVENTS_MAP.set(blockType, new Event(blockType));
  },
);

type TPayload = {
  blockType?: string;
  pageId?: string | TNil;
  metaContent?: boolean;
  pages?: boolean;
}

const cmsUpdEventSubject = new Subject<TPayload>();

const dispatchCmsUpdateEvent = (payload: TPayload) => {
  cmsUpdEventSubject.next(payload);
};

const fromCMSUpdEvent = cmsUpdEventSubject.asObservable();

fromCMSUpdEvent.subscribe();

export {
  dispatchCmsUpdateEvent,
  fromCMSUpdEvent,
};
