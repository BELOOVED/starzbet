import { ComponentType, createElement, type JSX } from "react";
import { TAnyObject } from "../UtilityTypes/TAnyObject";

const withProps = <P1 extends TAnyObject>(component: ComponentType<P1> | keyof JSX.IntrinsicElements) =>
  <P2 extends Partial<P1>>(defaultProps: P2): ComponentType<Omit<P1, keyof P2>> =>
    (props) => createElement<P1>(component, { ...defaultProps, ...props } as P1);

export { withProps }
