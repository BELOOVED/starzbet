import { type ComponentType, memo } from "react";
import { getNotNil, type TVoidFn, useActionWithBind, useParamSelector } from "@sb/utils";
import { type IError } from "@sb/network-bus/Model";
import type { TFuncWithPlain } from "@sb/translator";
import { modalDataSelector } from "../../../common/Store/Modal/Selectors/ModalSelectors";
import { EModal } from "../../../common/Store/Modal/Model/EModal";
import { modalCloseAction } from "../../../common/Store/Modal/ModalActions";
import { changePasswordFormErrorExtractor } from "../../Store/Password/Form/ChangePasswordForm";

interface IModalProps {
  title?: Readonly<Parameters<TFuncWithPlain>>;
  subtitle?: Readonly<Parameters<TFuncWithPlain>>;
  hideModal: TVoidFn;
}

interface IChangePasswordFormErrorModalFactoryProps {
  Component: ComponentType<IModalProps>;
  titleTKey: string;
}

const ChangePasswordFormErrorModalFactory = memo<IChangePasswordFormErrorModalFactoryProps>(({ Component, titleTKey }) => {
  const errors = useParamSelector(modalDataSelector<IError[]>, [EModal.changePasswordFormError]);
  const hideModal = useActionWithBind(modalCloseAction, EModal.changePasswordFormError);

  const notNilErrors = getNotNil(errors, ["ChangePasswordFormSubmitErrorModalFactory"], "notNilErrors");
  const notNilError = getNotNil(notNilErrors[0], ["ChangePasswordFormSubmitErrorModalFactory"], "notNilError");

  const subtitle: readonly [translateKey: string] = [changePasswordFormErrorExtractor(notNilError)];

  const title: readonly [translateKey: string] = [titleTKey];

  return <Component hideModal={hideModal} subtitle={subtitle} title={title} />;
});
ChangePasswordFormErrorModalFactory.displayName = "ChangePasswordFormErrorModalFactory";

interface IChangePasswordFormSuccessModalFactoryProps {
  Component: ComponentType<IModalProps>;
  titleTKey: string;
  subtitleTKey: string;
}

const ChangePasswordFormSuccessModalFactory = memo<IChangePasswordFormSuccessModalFactoryProps>(({
  Component,
  titleTKey,
  subtitleTKey,
}) => {
  const hideModal = useActionWithBind(modalCloseAction, EModal.changePasswordFormSuccess);

  const title = [titleTKey] as const;

  const subtitle = [subtitleTKey] as const;

  return <Component hideModal={hideModal} title={title} subtitle={subtitle} />;
});
ChangePasswordFormSuccessModalFactory.displayName = "ChangePasswordFormSuccessModalFactory";

interface IChangePasswordFormSubmitResultModalMapFactoryProps {
  errorModal: IChangePasswordFormErrorModalFactoryProps;
  successModal: IChangePasswordFormSuccessModalFactoryProps;
}

const changePasswordFormModalMapFactory = ({ errorModal, successModal }: IChangePasswordFormSubmitResultModalMapFactoryProps) => ({
  [EModal.changePasswordFormSuccess]: <ChangePasswordFormSuccessModalFactory {...successModal} />,
  [EModal.changePasswordFormError]: <ChangePasswordFormErrorModalFactory {...errorModal} />,
});

export { changePasswordFormModalMapFactory };
