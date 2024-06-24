import { EDebugMode } from "../Model/EDebugMode";
import { type IWithDebugModeState } from "../DebugModeState";

const debugModeSelector = ({ debugMode }: IWithDebugModeState) => debugMode;
const crashDebugSelector = (state: IWithDebugModeState) => debugModeSelector(state)[EDebugMode.crashDebug];
const eventDebugSelector = (state: IWithDebugModeState) => debugModeSelector(state)[EDebugMode.eventDebug];
const traceDebugSelector = (state: IWithDebugModeState) => debugModeSelector(state)[EDebugMode.traceDebug];

const comingSoonSelector = (state: IWithDebugModeState) => debugModeSelector(state)[EDebugMode.comingSoon];

export {
  crashDebugSelector,
  eventDebugSelector,
  traceDebugSelector,
  comingSoonSelector,
};
