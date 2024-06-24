import { type TExplicitAny } from "@sb/utils";
import { Logger } from "../../Utils/Logger";

declare global {
  interface Window {
    openSupport: () => void;
    Comm100API: { loaded: boolean; chat_buttons: TExplicitAny[]; open_chat_window: (a: null, b: unknown) => void; };
  }
}

const hasChatComm100 = () => window.Comm100API && window.Comm100API.open_chat_window;

const openSupport = () => {
  if (!hasChatComm100()) {
    return;
  }

  try {
    window.Comm100API.open_chat_window(null, window.Comm100API.chat_buttons[0].code_plan);
  } catch (e) {
    Logger.warn.app("Comm100API call of open_chat_window method produce an error\n", e);
  }
};

const openChatComm100 = () => openSupport();

export { openChatComm100 };
