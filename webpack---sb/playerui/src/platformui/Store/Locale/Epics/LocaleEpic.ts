import { tap } from "rxjs";
import { isCreator } from "@sb/utils";
import { localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { localeChangeAction } from "../../../../common/Actions";
import { changeTranslateControl } from "../../../../sportsbookui/Store/Locale/Epics/LocaleRootEpic";
import type { TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";

const localeEpic: TMixAppEpic = (action$, state$, deps) =>
  action$
    .pipe(
      isCreator(localeChangeAction),
      tap(({ payload: { locale } }) => {
        setLocalStorage(localStorageKeys.locale, locale);
      }),
      changeTranslateControl(state$, deps),
    );

export { localeEpic };
