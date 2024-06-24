import { withProps } from "@sb/utils";
import { LoggedContainerWithRedirect } from "../../../../../Components/LoggedContainerWithRedirect/LoggedContainerWithRedirect";
import { UpdatePasswordByEmailContent } from "../../../Components/AuthModalCreator/AuthModal/AuthModal";

const UpdatePasswordByEmail = withProps(LoggedContainerWithRedirect)({ notLogged: <UpdatePasswordByEmailContent /> });

export { UpdatePasswordByEmail };
