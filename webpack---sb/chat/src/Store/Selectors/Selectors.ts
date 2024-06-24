import { type Selector } from "react-redux";
import { type IWithChatState, type IChatState } from "../State";

const chatStateSelector: Selector<IWithChatState, IChatState> = (state) => state["com.chat"];

export { chatStateSelector };
