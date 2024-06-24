import { withProps } from "@sb/utils";
import { LoggedContainerWithRedirect } from "../../../../../Components/LoggedContainerWithRedirect/LoggedContainerWithRedirect";
import { ForgotPasswordContent } from "../../../Components/AuthModalCreator/AuthModal/AuthModal";

const ForgotPassword = withProps(LoggedContainerWithRedirect)({ notLogged: <ForgotPasswordContent /> });
ForgotPassword.displayName = "ForgotPassword";

export { ForgotPassword };

