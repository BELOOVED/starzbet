import { type TExplicitAny } from "@sb/utils";
import { type IMessagesState } from "../../Types/IMessagesState";

const getMessagesInitialState = <C extends Record<string, TExplicitAny>>(): IMessagesState<C> => ({
  list: [],
  fallbackPosition: "top-center",
});

export { getMessagesInitialState };
