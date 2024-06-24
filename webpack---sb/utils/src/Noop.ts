import { MouseEvent } from "react";
import { TVoidFn } from "./TVoidFn";

const voidFn = () => void 0;

const noopStopPropagation = (e?: MouseEvent<HTMLElement>) => {
  e?.stopPropagation();
};

const noopPreventDefault = (e?: MouseEvent<HTMLElement>) => {
  e?.preventDefault();
};

const noopPreventDefaultAndStopPropagation = (e?: MouseEvent<HTMLElement>) => {
  e?.preventDefault();
  e?.stopPropagation();
};

const withStopPropagation = <F extends TVoidFn>(callback: F) =>
  (e?: MouseEvent<HTMLElement>) => {
    e?.stopPropagation();

    callback();
  };

const withPreventDefault = <F extends TVoidFn>(callback: F) =>
  (e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault();

    callback();
  };

const withPreventDefaultAndStopPropagation = <F extends TVoidFn>(callback: F) =>
  (e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    callback();
  };

export {
  voidFn,
  noopStopPropagation,
  noopPreventDefault,
  noopPreventDefaultAndStopPropagation,
  withStopPropagation,
  withPreventDefault,
  withPreventDefaultAndStopPropagation,
};
