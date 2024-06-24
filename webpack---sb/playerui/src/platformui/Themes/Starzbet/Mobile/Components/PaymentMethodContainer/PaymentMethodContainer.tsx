import { type FC, memo, type PropsWithChildren, useMemo } from "react";
import { useSelector } from "react-redux";
import { isVoid, type TNullable, type TSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { type IWithRouterState } from "@sb/router";
import { platformui_starzbet_navLink_myAccount, type TTKeys } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./PaymentMethodContainer.module.css";
import { type TMixAppState } from "../../../../../../sportsbookui/Store/CreateMixInitialState";
import { type IWithPlatformBankingInitialState } from "../../../../../Store/Banking/PlatformBankingInitialState";
import { routeMap, type TRoutePath } from "../../../../../RouteMap/RouteMap";
import { BankingIcon } from "../../../Components/Icons/BankingIcon/BankingIcon";
import { PaymentNoteLabel } from "../../../Components/PaymentNoteLabel/PaymentNoteLabel";
import { AccountPage } from "../AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../PageHeader/PageHeader";

interface INoteLabelProps {
  noteSelector: TSelector<IWithPlatformBankingInitialState & IWithRouterState, TNullable<string>>;
  noteTKey: string;
}

const NoteLabel = memo<INoteLabelProps>(({ noteSelector, noteTKey }) => {
  const [t] = useTranslation();

  const note = useSelector(noteSelector);

  if (isVoid(note)) {
    return null;
  }

  return (
    <PaymentNoteLabel header={t(noteTKey)} content={note} />
  );
});
NoteLabel.displayName = "NoteLabel";

interface IPaymentMethodContainerProps extends INoteLabelProps {
  backPath: TRoutePath;
  headerTKey: TTKeys;
  currentMethodSelector: TSelector<TMixAppState, string | null>;
}

const PaymentMethodContainer: FC<PropsWithChildren<IPaymentMethodContainerProps>> = ({
  backPath,
  noteTKey,
  headerTKey,
  noteSelector,
  currentMethodSelector,
  children,
}) => {
  const [t] = useTranslation();

  const currentMethod = useSelector(currentMethodSelector);

  const headerRouteMap = useMemo<TPageHeaderSourceMap>(
    () => [
      {
        titleTKey: platformui_starzbet_navLink_myAccount,
        path: routeMap.myAccountRoute,
      },
      {
        titleTKey: headerTKey,
        path: backPath,
      },
      {
        titleNode: currentMethod,
      },
    ],
    [currentMethod],
  );

  return (
    <AccountPage
      backPath={backPath}
      title={t(headerTKey)}
      icon={BankingIcon}
      routeMap={headerRouteMap}
      headerColorScheme={"purple"}
    >
      <div className={classes.container}>
        <NoteLabel noteSelector={noteSelector} noteTKey={noteTKey} />

        <div>
          {children}
        </div>
      </div>
    </AccountPage>
  );
};
PaymentMethodContainer.displayName = "PaymentMethodContainer";

export { PaymentMethodContainer };
