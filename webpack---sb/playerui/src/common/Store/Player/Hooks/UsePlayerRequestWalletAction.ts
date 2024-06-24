import { useAction } from "@sb/utils";
import { playerRequestWalletAction } from "../PlayerActions";

const usePlayerRequestWalletAction = () => useAction(playerRequestWalletAction);

export { usePlayerRequestWalletAction };
