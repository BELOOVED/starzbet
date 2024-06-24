import { MutableRefObject, RefObject, useRef, useState } from "react";
import { useClickAway } from "ahooks";
import { withStopPropagation } from "./Noop";
import { always } from "./Always";
import { not } from "./Not";
import { usePersistCallback } from "./ReactUtils/UsePersist";

const ignoreClickOnOtherRef = (ref: RefObject<HTMLDivElement>) =>
  (event: Event) => !(ref.current && event.composedPath().includes(ref.current));

const useDropdown = (
  shouldHideOnClickAway: (event: Event) => boolean = always(true),
): [
  ref: MutableRefObject<HTMLDivElement>,
  isOpened: boolean,
  showDropdown: () => void,
  togglDropdown: () => void,
] => {
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickAway((event) => {
    if (shouldHideOnClickAway(event)) {
      setDropdown(false);
    }
  }, ref);

  const showDropdown = usePersistCallback(withStopPropagation(() => setDropdown(true)));

  const toggleDropdown = usePersistCallback(withStopPropagation(() => setDropdown(not)));

  return [ref as MutableRefObject<HTMLDivElement>, dropdown, showDropdown, toggleDropdown];
};

export {
  ignoreClickOnOtherRef,
  useDropdown,
};
