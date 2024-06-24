import { simpleReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";

const currentDomainReceiveReducer = simpleReducer<TPlatformAppState>([], ["currentDomain"]);

export { currentDomainReceiveReducer };
