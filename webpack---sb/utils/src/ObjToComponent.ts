import { ComponentType, createElement, Key } from "react";

export const objToComponent = <P1 extends {} = {}, P2 extends {} = {}>(
  keyName: keyof P1 | keyof P2,
  enhanceProps?: P1,
) => (component: ComponentType<P2>) => (props: P1 & P2) => (
  createElement(component, {
    key: props[keyName] as unknown as Key,
    ...props,
    ...enhanceProps,
  })
);
