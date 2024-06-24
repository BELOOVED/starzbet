import { type ComponentType, createElement, type Dispatch, memo, startTransition, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { deepEqual } from "fast-equals";
import { withProps } from "@sb/utils";
import { VirtualList } from "./VirtualList";
import { type IVirtualCommonProps } from "./IVirtualListProps";
import { type TEntries, type TEntryWalker } from "./VirtualContainerTypes";

type TButton = ComponentType<{ handler: Dispatch<number>; }>;

interface IVirtualContainerProps extends IVirtualCommonProps {
  entryWalker: TEntryWalker;

  //TODO
  deps: unknown[];
  selectorFactory: (deps: unknown[]) => (state: unknown) => TEntries;

  offset?: number;
  button: TButton;

  buttonSize?: number;
}

interface IMoreButtonProps {
  showedButton: boolean;

  button: TButton;

  handler: Dispatch<number>;

  buttonSize?: number;
}

const useShowButton = (limited: boolean) => {
  const [totalHeightReady, setTotalHeightReady] = useState(false);

  const showedButton = limited && totalHeightReady;

  const totalListHeightChanged = useCallback(
    (height) => {
      if (height > 100) {
        startTransition(() => {
          setTotalHeightReady(true);
        });
      }
    },
    [],
  );

  return { showedButton, totalListHeightChanged };
};

const useChangeLimitByGroupIndex = (
  entries: TEntries,
  limit: number,
  offset: number,
  setLimit: Dispatch<number>,
) => useCallback(
  (groupIndex: number) => {
    const currentEntries = entries.slice(0, groupIndex + 1);

    let newLimit = offset;

    currentEntries.forEach(([_, group]) => {
      if (group.every((it) => !Array.isArray(it))) {
        newLimit = newLimit + group.length;

        return;
      }

      group.forEach(([_, item]) => {
        newLimit = newLimit + item.length;
      });
    });

    if (newLimit > limit) {
      setLimit(newLimit);
    }
  },
  [entries, offset, limit],
);

const MoreButton = memo<IMoreButtonProps>(({
  showedButton,
  button,
  buttonSize,
  handler,
}) => {
  if (!showedButton) {
    return null;
  }

  const style = buttonSize ? { height: buttonSize } : undefined;

  return (
    <div style={style}>
      {createElement(button, { handler })}
    </div>
  );
});
MoreButton.displayName = "MoreButton";

const StubTopItemList = ({ children }) => children;
StubTopItemList.displayName = "StubTopItemList";

const VIRTUAL_CONTAINER_STYLE = {
  style: {
    height: "100%",
  },
};

const VirtualContainer = memo<IVirtualContainerProps>(({
  selectorFactory,
  deps = [],
  offset = 20,
  button,
  buttonSize,
  entryWalker,
  ...rest
}) => {
  const selector = useMemo(() => selectorFactory(deps), deps);

  const entries = useSelector(selector, deepEqual);

  const [limit, setLimit] = useState(offset);

  const showMoreHandler = useCallback(() => setLimit((prev) => prev + offset), []);

  const [limited, nextEntries] = useMemo(() => entryWalker(entries, limit), [entries, limit]);

  const { showedButton, totalListHeightChanged } = useShowButton(limited);

  const changeLimitByGroupIndex = useChangeLimitByGroupIndex(entries, limit, offset, setLimit);

  const components = useMemo(
    () => ({
      Footer: withProps(MoreButton)({
        handler: showMoreHandler,
        button,
        buttonSize,
        showedButton,
      }),
      TopItemList: StubTopItemList,
    }),
    [showedButton],
  );

  const context = useMemo(() => ({ changeLimitByGroupIndex }), [changeLimitByGroupIndex]);

  return (
    <div {...VIRTUAL_CONTAINER_STYLE}>
      <VirtualList
        {...rest}
        entries={nextEntries}
        components={components}
        totalListHeightChanged={totalListHeightChanged}
        context={context}
      />
    </div>
  );
});
VirtualContainer.displayName = "VirtualContainer";

export { VirtualContainer };
