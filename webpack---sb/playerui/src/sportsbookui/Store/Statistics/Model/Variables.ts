import { createCallManagerSymbol } from "@sb/call-manager";

const STATISTIC_PARSER_LOAD_SYMBOL = createCallManagerSymbol("statistic");
const VIRTUAL_PARSER_LOAD_SYMBOL = createCallManagerSymbol("virtual");

export { VIRTUAL_PARSER_LOAD_SYMBOL, STATISTIC_PARSER_LOAD_SYMBOL };
