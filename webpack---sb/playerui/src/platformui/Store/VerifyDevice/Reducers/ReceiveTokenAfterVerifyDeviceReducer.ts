import { simpleReducer } from "@sb/utils";
import type { TPlatformAppState } from "../../PlatformInitialState";

const receiveTokenAfterVerifyDeviceReducer = simpleReducer<TPlatformAppState>([], ["tokenDto"]);

export { receiveTokenAfterVerifyDeviceReducer };
