import { useSyncExternalStore } from "react";
import { voidFn } from "@sb/utils";
import { always } from "@sb/utils/Always";

const alwaysVoidFn = always(voidFn);

const useIsHydration = () =>
  useSyncExternalStore(alwaysVoidFn, always(false), always(true));

export { useIsHydration };
