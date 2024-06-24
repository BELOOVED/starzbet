import { memo } from "react";
import type { TSportsbook_Pick_Fragment } from "@sb/graphql-client/PlayerUI";
import { normalizePick } from "../../../../../../../common/Utils/NormalizePick";
import { isOutrightKind } from "../../../../../../Store/Feed/Model/Outright";
import { EventPickFromGQL } from "./PickFromGQL/EventPickFromGQL";
import { EventPickFromFS } from "./PickFromFS/EventPickFromFS";
import { OutrightPickFromFS } from "./PickFromFS/OutrightPickFromFS";
import { OutrightPickFromGQL } from "./PickFromGQL/OutrightPickFromGQL";

type TPickFromGQLProps = TSportsbook_Pick_Fragment & {
  isDropDown: boolean;
}

const PickFromGQL = memo<TPickFromGQLProps>(({ isDropDown, ...pick }) => (
  pick.__typename === "Sportsbook_OutrightPick"
    // @ts-expect-error @react-18-typings
    ? <OutrightPickFromGQL {...normalizePick(pick)} isDropDown={isDropDown} />
    // @ts-expect-error @react-18-typings
    : <EventPickFromGQL {...normalizePick(pick)} isDropDown={isDropDown} />
));
PickFromGQL.displayName = "PickFromGQL";

// @ts-ignore
const PickFromFS = memo(({ "@kind": kind, isDropDown, ...rest }) => (
  isOutrightKind(kind)
    // @ts-expect-error @react-18-typings
    ? <OutrightPickFromFS {...rest} isDropDown={isDropDown} />
    // @ts-expect-error @react-18-typings
    : <EventPickFromFS {...rest} isDropDown={isDropDown} />
));
PickFromFS.displayName = "PickFromFS";

export { PickFromGQL, PickFromFS };
