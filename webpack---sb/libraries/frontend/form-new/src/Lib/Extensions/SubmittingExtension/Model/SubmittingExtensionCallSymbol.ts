import { createCallManagerSymbol } from "@sb/call-manager";
import { SUBMITTING_EXTENSION_KEY } from "./SubmittingExtensionKey";

const SUBMITTING_EXTENSION_CALL_SYMBOL = createCallManagerSymbol(SUBMITTING_EXTENSION_KEY);

export { SUBMITTING_EXTENSION_CALL_SYMBOL };
