import { type CSSProperties } from "react";
import { IS_SERVER } from "@sb/utils";

// will be used for calc iframe size with header
const INITIAL_GAME_WINDOW_WIDTH = 800;
const INITIAL_GAME_WINDOW_HEIGHT = 600;

const GAME_WINDOW_HEADER_HEIGHT_V1 = 50;
const GAME_WINDOW_HEADER_HEIGHT_V2 = 62;
const GAME_WINDOW_HEADER_HEIGHT_V3 = 48;
const GAME_WINDOW_HEADER_STYLE_V1: CSSProperties = { height: `${GAME_WINDOW_HEADER_HEIGHT_V1}px` };
const GAME_WINDOW_HEADER_STYLE_V2: CSSProperties = { height: `${GAME_WINDOW_HEADER_HEIGHT_V2}px` };

const getGameWindowFeatures = (isMobile: boolean) => isMobile || IS_SERVER
  ? ""
  : `width=${INITIAL_GAME_WINDOW_WIDTH},height=${INITIAL_GAME_WINDOW_HEIGHT},left=${(screen.width - INITIAL_GAME_WINDOW_WIDTH) / 2},top=${(screen.height - INITIAL_GAME_WINDOW_HEIGHT) / 2}`;

export {
  GAME_WINDOW_HEADER_HEIGHT_V1,
  GAME_WINDOW_HEADER_HEIGHT_V2,
  GAME_WINDOW_HEADER_HEIGHT_V3,
  getGameWindowFeatures,
  GAME_WINDOW_HEADER_STYLE_V1,
  GAME_WINDOW_HEADER_STYLE_V2,

};
