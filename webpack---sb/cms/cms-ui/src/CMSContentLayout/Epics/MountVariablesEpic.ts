import { VARIABLES_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { whenDataLoadedEpic } from "../../EpicUtils/EpicUtils";
import { mountBlockContentWrapperEpic } from "./MountBlockContentWrapperEpic";

const mountVariablesEpic = whenDataLoadedEpic(VARIABLES_CALL_SYMBOL)(mountBlockContentWrapperEpic);

export { mountVariablesEpic };
