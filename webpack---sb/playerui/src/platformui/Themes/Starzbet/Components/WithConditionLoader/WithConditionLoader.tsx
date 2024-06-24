import { type ComponentType, createElement, memo } from "react";
import { type Selector, useSelector } from "react-redux";
import { type TAnyObject } from "@sb/utils";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { type TPlatformAppState } from "../../../../Store/PlatformInitialState";

interface IWithConditionLoader {
  selector: Selector<TPlatformAppState, boolean>;
  component: ComponentType<TAnyObject>;
}

const WithConditionLoader = memo<IWithConditionLoader>(({ selector, component }) => {
  const isLoaded = useSelector(selector);

  return isLoaded ? createElement(component) : <Loader />;
});
WithConditionLoader.displayName = "WithConditionLoader";

export { WithConditionLoader };
