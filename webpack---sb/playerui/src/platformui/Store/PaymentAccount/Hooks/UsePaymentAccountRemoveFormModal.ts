import { useMemo } from "react";
import { useActionWithBind, useParamSelector, voidFn } from "@sb/utils";
import { selectIsFormSubmittingStarted, submitFormAction, useFormName } from "@sb/form-new";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { useModalCloseAction } from "../../../../common/Store/Modal/Hooks/UseModalCloseAction";

const usePaymentAccountRemoveFormModal = () => {
  const formName = useFormName();

  const onOk = useActionWithBind(submitFormAction, formName);
  const hideModal = useModalCloseAction(EModal.paymentAccountRemove);

  const loading = useParamSelector(selectIsFormSubmittingStarted, [formName]);

  return useMemo(
    () => ({
      onOk,
      onCancel: loading ? voidFn : hideModal,
      okLoading: loading,
      cancelLoading: loading,
    }),
    [
      onOk,
      hideModal,
      loading,
    ],
  );
};

export { usePaymentAccountRemoveFormModal };
