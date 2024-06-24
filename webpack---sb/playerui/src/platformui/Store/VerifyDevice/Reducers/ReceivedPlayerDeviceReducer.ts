import { simpleReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";

const receivedPlayerDeviceReducer = simpleReducer<TPlatformAppState>([], ["devices"]);

export { receivedPlayerDeviceReducer };
