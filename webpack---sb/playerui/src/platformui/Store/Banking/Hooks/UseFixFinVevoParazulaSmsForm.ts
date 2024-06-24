import { useDispatch, useSelector } from "react-redux";
import { usePersistCallback, withPreventDefault } from "@sb/utils";
import { submitFormAction, useFormName } from "@sb/form-new";
import { useLocalizedPushPath } from "../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../RouteMap/RouteMap";
import { depositFixFinFiatVevoParazulaFormResponseMessageSelector } from "../Form/FixFin/FixFinVevoParazulaFormSelectors";
import { fixFinVevoParazulaSmsLoadingSelector } from "../Selectors/PlatformBankingLoaderSelectors";

const useFixFinVevoParazulaSmsForm = () => {
  const formName = useFormName();
  const dispatch = useDispatch();

  const message = useSelector(depositFixFinFiatVevoParazulaFormResponseMessageSelector);
  const loading = useSelector(fixFinVevoParazulaSmsLoadingSelector);

  const goToPending = useLocalizedPushPath(routeMap.bankingHistoryWithdrawalsRoute);
  const onSubmit = usePersistCallback(
    withPreventDefault(() => {
      dispatch(submitFormAction(formName));
    }),
  );

  return {
    message,
    goToPending,
    onSubmit,
    loading,
  };
};

export { useFixFinVevoParazulaSmsForm };
