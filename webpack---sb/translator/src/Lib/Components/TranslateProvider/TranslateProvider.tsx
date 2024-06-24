import { Provider } from "react-redux";
import { type FC, memo, type PropsWithChildren, useEffect } from "react";
import { ActiveKeysManager } from "../../Store/ActiveKeysManager";
import { TranslatableContext } from "../../Context/TranslatableContext";
import { TranslatorEditorContext, useDispatch } from "../../Hooks/ReactRedux";
import { type IControl } from "../../Store/CreateControlFactory";
import { PanelWrapper } from "./PanelWrapper";

interface ITranslateProviderProps extends PropsWithChildren {
  control: IControl;
}

const ActiveKeysManagerInitializer = memo(() => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      ActiveKeysManager.initialize(dispatch);
    },
    [],
  );

  return null;
});
ActiveKeysManagerInitializer.displayName = "ActiveKeysManagerInitializer";

const TranslateProvider: FC<ITranslateProviderProps> = ({
  children,
  control,
}) => (
  <TranslatableContext.Provider value={control}>
    <Provider store={control.store} context={TranslatorEditorContext}>
      <ActiveKeysManagerInitializer />

      {children}

      <PanelWrapper />
    </Provider>
  </TranslatableContext.Provider>
);
TranslateProvider.displayName = "TranslateProvider";

export { TranslateProvider };

