import { UIEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { isNil } from "../IsNil";
import { TExplicitAny } from "../TAny";

type TPredicate = () => boolean;

const useChatAutoscroll = <
  E extends HTMLElement = HTMLElement,
  P extends TPredicate = TPredicate,
  D extends TExplicitAny[] = TExplicitAny[],
>(shouldScrollToBottom: P, deps: D) => {
  const scrollableRef = useRef<E | null>(null);

  const [isScrollInBottom, setIsScrollInBottom] = useState<boolean>(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const container = scrollableRef.current;

    if (isNil(container)) {
      return;
    }

    container.scrollTo({ left: 0, top: container.scrollHeight, behavior });
  }, []);

  const onScroll: UIEventHandler<E> = useCallback((event) => {
    const container = event.target as E;

    const containerHeight = Math.floor(container.getBoundingClientRect().height);
    const scrollHeightDiff = Math.floor(container.scrollHeight - Math.floor(container.scrollTop));

    const bottomScroll = containerHeight - scrollHeightDiff;

    setIsScrollInBottom(Math.abs(bottomScroll) <= 10);
  }, []);

  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  useEffect(() => {
    if (isScrollInBottom || shouldScrollToBottom()) {
      setTimeout(() => {
        scrollToBottom("auto");
      })
    }
  }, deps);

  return {
    scrollableRef,
    onScroll,
    scrollToBottom,
    isScrollInBottom,
  };
};

export { useChatAutoscroll };

export type { TPredicate }
