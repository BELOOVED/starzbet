import { Provider } from "react-redux";
import { type FC, type PropsWithChildren } from "react";
import { type ICMSControl } from "../../Store/Model";
import { PanelWrapper } from "./PanelWrapper";

interface ITranslateProviderProps extends PropsWithChildren {
  control: ICMSControl;
}

const CMSEditorProvider: FC<ITranslateProviderProps> = ({
  children,
  control,
}) => (
  <Provider store={control.store}>
    <PanelWrapper />

    {children}
  </Provider>
);
CMSEditorProvider.displayName = "TranslateProvider";

export { CMSEditorProvider };

