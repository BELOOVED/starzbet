type TCallManagerSymbol = `@@callManager@@_${string}`;

type TCallManagerSymbolPair = TCallManagerSymbol | [symbol: TCallManagerSymbol, id: string];

/**
 * Only for usages in @sb/call-manager package
 */
const NOOP_ID = "@@noopId@@";

const createCallManagerSymbol = (command: string): TCallManagerSymbol => `@@callManager@@_${command}`;

export {
  type TCallManagerSymbol,
  type TCallManagerSymbolPair,
  NOOP_ID,
  createCallManagerSymbol,
};
