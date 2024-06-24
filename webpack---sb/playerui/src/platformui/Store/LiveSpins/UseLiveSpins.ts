import { useAction } from "@sb/utils";
import { addScript } from "../../Utils/AddScript";
import { liveSpinsScriptLoadedAction } from "./Actions/LiveSpinsActions";

const useLiveSpins = (scriptSrc: string) => {
  addScript(scriptSrc);
  const liveSpinsScriptLoaded = useAction(liveSpinsScriptLoadedAction);
  document.addEventListener(
    "LIVESPINS_LOADED",
    () => {
      liveSpinsScriptLoaded(true);
    },
  );
};

export { useLiveSpins };
