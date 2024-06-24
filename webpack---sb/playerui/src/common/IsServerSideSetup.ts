import { IS_SERVER } from "@sb/utils";

const IS_SERVER_SIDE_SETUP = IS_SERVER || window.__SERVER_SIDE_MODE__;

export { IS_SERVER_SIDE_SETUP };
