import { createElement, memo, useCallback, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { isLiveOrFinishedVirtualTournamentSelector } from "../../Store/Virtual/Common/Hooks/UseVirtualTournamentSelectors";
import { type ICustomGroupContentProps } from "../VirtualContainer/IVirtualListProps";

type TChangeLimitByGroupIndex = (groupIndex: number) => void;

interface ICustomGroupContentContext{
  changeLimitByGroupIndex: TChangeLimitByGroupIndex;
}

const useChangeLimit = (expanded: boolean, groupIndex: number, changeLimitByGroupIndex: TChangeLimitByGroupIndex) => {
  const refExpanded = useRef(expanded);

  useLayoutEffect(
    () => {
      if(refExpanded.current !== expanded && !expanded) {
        changeLimitByGroupIndex(groupIndex);
      }
    },
    [expanded],
  );
};

const CustomGroupContent = memo<ICustomGroupContentProps<ICustomGroupContentContext>>(({
  expanded,
  groupComponent,
  groupIndex,
  id,
  toggle,
  context: { changeLimitByGroupIndex },
}) => {
  useChangeLimit(expanded, groupIndex, changeLimitByGroupIndex);

  return (
    createElement(groupComponent, { id, expanded, toggle })
  );
});
CustomGroupContent.displayName = "CustomGroupContent";

const VirtualCustomGroupContent = memo<ICustomGroupContentProps<ICustomGroupContentContext>>(({
  expanded,
  groupComponent,
  groupIndex,
  groupMap,
  id,
  setGroupMap,
  context: { changeLimitByGroupIndex },
}) => {
  const liveOrFinished = useSelector(isLiveOrFinishedVirtualTournamentSelector(id));

  useChangeLimit(expanded, groupIndex, changeLimitByGroupIndex);

  useLayoutEffect(
    () => {
      if(!groupMap.hasOwnProperty(groupIndex)) {
        if (liveOrFinished && expanded) {
          setGroupMap((prev) => ({ ...prev, [groupIndex]: true }));
        }
      }
    },
    [],
  );

  const toggle = useCallback(
    () => {
      setGroupMap((prev) => ({ ...prev, [groupIndex]: !prev[groupIndex] }));
    },
    [],
  );

  return (
    createElement(groupComponent, { id, expanded, toggle })
  );
});
VirtualCustomGroupContent.displayName = "VirtualCustomGroupContent";

export { VirtualCustomGroupContent, CustomGroupContent };
