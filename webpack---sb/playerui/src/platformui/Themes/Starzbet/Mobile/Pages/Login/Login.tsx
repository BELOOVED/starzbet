import { memo } from "react";
import { LoggedContainerWithRedirect } from "../../../../../Components/LoggedContainerWithRedirect/LoggedContainerWithRedirect";
import { LoginContent } from "../../../Components/AuthModalCreator/AuthModal/AuthModal";

const Login = memo(() => <LoggedContainerWithRedirect notLogged={<LoginContent />} />);
Login.displayName = "Login";

export { Login };
