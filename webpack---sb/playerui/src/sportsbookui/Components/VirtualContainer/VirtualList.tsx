import sum from "lodash/fp/sum";
import { createElement, memo, useCallback, useMemo, useState } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { removeVoidProperties } from "@sb/utils";
import { noop } from "../../Utils/Noop";
import { range } from "../../Utils/Range";
import { type TEntries, type TSportEntries } from "./VirtualContainerTypes";
import { type IVirtualListProps } from "./IVirtualListProps";
import { VirtualListFixHeight } from "./VirtualListFixHeight";
import { useCustomScrollParent } from "./UseCustomScrollParent";

interface IModifiedItemSize {
  origin: boolean | undefined;
  add: number | undefined;
  remove: number | undefined;

  auto: boolean | undefined;
}

const zeroItemSize = 0.1;

const fixItemSize = (value: number) => Math.max(zeroItemSize, value);

const getGroupId = (entries: TEntries, groupIndex: number) => {
  const [id] = entries[groupIndex];

  return id;
};

const countNestedLevels = (arr: unknown[]): number => {
  let maxLevel = 0;
  const level = 1;
  const stack: { arr: unknown; level: number; }[] = [{ arr, level }];

  while (stack.length > 0) {
    const item = stack.pop();

    if (item) {
      const { arr, level } = item;

      if (Array.isArray(arr)) {
        maxLevel = level > maxLevel ? level : maxLevel;
        const nextLevel = level + 1;

        for (let i = arr.length - 1; i >= 0; i--) {
          stack.push({ arr: arr[i], level: nextLevel });
        }
      }
    }
  }

  return maxLevel;
};

const isSportEntries = (entries: TEntries): entries is TSportEntries => countNestedLevels(entries) === 5;

const toGroupCounts = (entries: TEntries) => entries.map(([_, ids]) => ids.length);

const getIndexInGroup = (entries: TEntries, itemIndex: number, groupIndex: number) => {
  if (groupIndex === 0) {
    return itemIndex;
  }

  const sumPrevIndexes = sum(toGroupCounts(entries.slice(0, groupIndex)));

  return itemIndex - sumPrevIndexes;
};

const getItemId = (entries: TEntries, itemIndex: number, groupIndex: number) => {
  const indexInGroup = getIndexInGroup(entries, itemIndex, groupIndex);

  if (isSportEntries(entries)) {
    const [_, tournamentEntries] = entries[groupIndex];

    const [id] = tournamentEntries[indexInGroup];

    return id;
  }

  const [_, eventIds] = entries[groupIndex];

  return eventIds[indexInGroup];
};

const getItemEntryIds = (entries: TEntries, itemIndex: number, groupIndex: number) => {
  const indexInGroup = getIndexInGroup(entries, itemIndex, groupIndex);

  if (isSportEntries(entries)) {
    const [_, tournamentEntries] = entries[groupIndex];

    const [__, ids] = tournamentEntries[indexInGroup];

    return ids;
  }

  return undefined; //unsupported ids
};

const useGroupCounts = (entries: TEntries): number[] => useMemo(() => toGroupCounts(entries), [entries]);

const useIndexMap = () => {
  const [map, setMap] = useState({});

  const changeMap = (index: number) => () => {
    setMap((prev) => {
      if (prev[index]) {
        const result = { ...prev };

        delete result[index];

        return result;
      }

      return { ...prev, [index]: true };
    });
  };

  return { map, changeMap, setMap };
};

const useModifiedItemSize = () => {
  const [modifiedItemSizeMap, setModifiedItemSizeMap] = useState<Record<number, IModifiedItemSize>>({});

  const configureItemSize = useCallback(
    (itemIndex: number) => (newSize: IModifiedItemSize) => {
      const value = removeVoidProperties(newSize);

      if (Object.keys(value).length === 0) {
        return;
      }

      setModifiedItemSizeMap((prevState) => ({
        ...prevState,
        [itemIndex]: value,
      }));
    },
    [],
  );

  return { modifiedItemSizeMap, configureItemSize };
};

const VirtualList = memo<IVirtualListProps>(({
  entries,
  groupComponent,
  itemComponent,
  groupSize,
  minItemSize,
  minGroupSize,
  itemSize,
  components,
  emptyComponent,
  totalListHeightChanged,
  customGroupContent,
  context,
  entrySize = 0,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  groupExpandable = true,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  itemExpandable = true,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  useWindowScroll = true,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  defaultItemExpandable = true,
  autoExpandedItemSize = false,
}) => {
  const { map: groupMap, changeMap: clickOnGroup, setMap: setGroupMap } = useIndexMap();

  const { map: itemMap, changeMap: clickOnItem } = useIndexMap();

  const { modifiedItemSizeMap, configureItemSize } = useModifiedItemSize();

  const groupCounts = useGroupCounts(entries);

  const getItemExpanded = (itemIndex: number) => {
    if (!itemExpandable) {
      return defaultItemExpandable;
    }

    if (itemMap.hasOwnProperty(itemIndex)) {
      return itemMap[itemIndex];
    }

    return defaultItemExpandable;
  };

  const getGroupExpanded = (groupIndex: number) => groupExpandable ? !groupMap[groupIndex] : true;

  const computeItemSize = (itemIndex: number, groupIndex: number | undefined) => {
    if (groupIndex === undefined) {
      if (minGroupSize) {
        const expanded = getGroupExpanded(itemIndex);

        return expanded ? groupSize : minGroupSize;
      }

      return groupSize;
    }

    if (groupMap[groupIndex]) {
      return fixItemSize(0);
    }

    const expanded = getItemExpanded(itemIndex);

    if (!expanded) {
      return minItemSize;
    }

    const entryIds = getItemEntryIds(entries, itemIndex, groupIndex);

    const entriesSize = entryIds ? (entryIds.length * entrySize) : 0;

    return itemSize + entriesSize;
  };

  const getItemSizeByElement = (el: HTMLElement) => {
    const dataset = el.dataset;

    const attrItemIndex = dataset.itemIndex;
    const attrItemGroupIndex = dataset.itemGroupIndex;

    const itemIndex = Number(attrItemIndex);

    if (autoExpandedItemSize) {
      const expanded = getItemExpanded(itemIndex);

      if (expanded) {
        return fixItemSize(el.getBoundingClientRect().height);
      }
    }

    const originSize = computeItemSize(
      itemIndex,
      attrItemGroupIndex === undefined ? undefined : Number(attrItemGroupIndex),
    );

    const modifiedSize = modifiedItemSizeMap[itemIndex];

    if (!modifiedSize || modifiedSize.origin) {
      return originSize;
    }

    if (modifiedSize.add) {
      return originSize + modifiedSize.add;
    }

    if (modifiedSize.remove) {
      return originSize + modifiedSize.remove;
    }

    if (!modifiedSize.auto) {
      return originSize;
    }

    return fixItemSize(el.getBoundingClientRect().height);
  };

  const computeTotalSize = () => groupCounts.length === 0
    ? 0
    : groupCounts.reduce(
      (acc, groupCount, groupIndex) => {
        const prevIndex = sum(groupCounts.slice(0, groupIndex));

        return acc + sum(range(0, groupCount - 1).map((itemIndex: number) => computeItemSize(prevIndex + itemIndex, groupIndex)));
      },
      0,
    );

  const itemContent = (index: number, groupIndex: number) => {
    if (groupMap[groupIndex]) {
      return null;
    }

    const id = getItemId(entries, index, groupIndex);
    const entryIds = getItemEntryIds(entries, index, groupIndex);

    const expanded = getItemExpanded(index);

    const toggle = itemExpandable ? clickOnItem(index) : noop;

    return (
      createElement(
        itemComponent,
        {
          key: id,
          id,
          entryIds,
          expanded,
          toggle,
          context: {
            changeItemSize: configureItemSize(index),
          },
        },
      )
    );
  };

  const groupContent = (groupIndex: number) => {
    const id = getGroupId(entries, groupIndex);

    const expanded = getGroupExpanded(groupIndex);

    const toggle = groupExpandable ? clickOnGroup(groupIndex) : noop;

    if (customGroupContent) {
      return (
        createElement(
          customGroupContent,
          {
            key: id,
            groupIndex,
            groupMap,
            groupComponent,
            id,
            expanded,
            setGroupMap,
            toggle,
            context,
          },
        )
      );
    }

    return (
      createElement(
        groupComponent,
        {
          id,
          expanded,
          toggle,
          key: id,
        },
      )
    );
  };

  const customScrollParent = useCustomScrollParent();

  if (entries.length === 0) {
    return emptyComponent ? createElement(emptyComponent) : null;
  }

  const virtualList = (
    <GroupedVirtuoso
      customScrollParent={customScrollParent}
      useWindowScroll={useWindowScroll}
      itemSize={getItemSizeByElement}
      groupCounts={groupCounts}
      groupContent={groupContent}
      itemContent={itemContent}
      components={components}
      totalListHeightChanged={totalListHeightChanged}
      increaseViewportBy={window.innerHeight * 0.8}
      context={context}
    />
  );

  if (useWindowScroll && !customScrollParent) {
    return (
      <VirtualListFixHeight computeTotalSize={computeTotalSize} counts={groupCounts.length}>
        {virtualList}
      </VirtualListFixHeight>
    );
  }

  return virtualList;
});
VirtualList.displayName = "VirtualList";

export { VirtualList };
