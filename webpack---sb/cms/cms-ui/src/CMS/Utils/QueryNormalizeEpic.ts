import { queryNormalizeEpicFactory } from "@sb/adminui-utils";
import { type TKey } from "@sb/translates/cmsui/Keys";
import { type TCmsAppState } from "../../Model/TCmsAppState";

const queryNormalizeEpic = queryNormalizeEpicFactory<TCmsAppState, TKey>();

export {
  queryNormalizeEpic,
};
