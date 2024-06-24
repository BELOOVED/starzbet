import { simpleReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";

const startVerifyDeviceReducer = simpleReducer<TPlatformAppState>(["device"], ["device"]);

export { startVerifyDeviceReducer };
