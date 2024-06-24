import { Attributes, ComponentType, createElement } from "react";

export const keyToComponent = <P extends {}>(
  keyName: string,
  props: Attributes & P,
) => (component: ComponentType<P>) => (key: string) =>
  createElement(component, {
    key,
    [keyName]: key,
    ...props,
  });
