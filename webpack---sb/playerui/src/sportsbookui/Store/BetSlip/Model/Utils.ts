import { type BasePick, VirtualGamePick } from "./BetPick";

const isVirtualPick = (pick: BasePick | VirtualGamePick | undefined): pick is VirtualGamePick => !!pick && pick instanceof VirtualGamePick;

export { isVirtualPick };
