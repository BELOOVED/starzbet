import { memo } from "react";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { LoggedContainerWithRedirect } from "../../../../../Components/LoggedContainerWithRedirect/LoggedContainerWithRedirect";
import { scrollToTop } from "../../../../../Utils/ScrollToTop";
import { Register as BaseRegister } from "../../../Desktop/Pages/Register/Register";
import { RegistrationForm } from "../../../Desktop/Pages/Register/Forms/RegistrationForm";
import { PrivateRegistrationForm } from "../../../Desktop/Pages/Register/Forms/PrivateRegistrationForm";

interface IRegisterProps {
  type: EAuthModal.registration | EAuthModal.privateRegistration;
}

const Register = memo<IRegisterProps>(({ type }) => {
  scrollToTop();

  return (
    <LoggedContainerWithRedirect
      notLogged={<BaseRegister formComponent={type === EAuthModal.registration ? RegistrationForm : PrivateRegistrationForm} />}
    />
  );
});
Register.displayName = "Register";

export { Register };
