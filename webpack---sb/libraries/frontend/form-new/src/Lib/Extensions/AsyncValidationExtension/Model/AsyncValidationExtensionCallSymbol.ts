import { createCallManagerSymbol } from "@sb/call-manager";
import { ASYNC_VALIDATION_EXTENSION_KEY } from "./AsyncValidationExtensionKey";

const ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL = createCallManagerSymbol(ASYNC_VALIDATION_EXTENSION_KEY);

export { ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL };
