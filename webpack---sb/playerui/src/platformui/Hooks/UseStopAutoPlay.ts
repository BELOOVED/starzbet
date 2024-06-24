import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { getNotNil, useParamSelector } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { isBonusEventReceivedSelector } from "../Store/PlayGame/BonusMatchedWithGameSelectors";
import { isBonusEventReceivedSelector as isBonusEventReceivedSelectorNew } from "../Store/BonusEvents/BonusEventsSelector";
import { playGameGameSelector } from "../Store/PlayGame/PlayGameSelectors";
import { assertNotNilGameByIdSelector } from "../Store/Games/Selectors/GamesSelectors";
import { getGameId } from "../Store/PlayGamePage/Utils/GetGame";

const useStopAutoplay = () => {
  const ref = useRef<HTMLIFrameElement | null>(null);

  const isBonusEventReceived = useSelector(isBonusEventReceivedSelector);
  const { provider } = useSelector(playGameGameSelector);

  useEffect(
    () => {
      if (isBonusEventReceived) {
        // todo support for other providers
        switch (provider) {
          case EProviderCode.PRAGMATIC_PLAY: {
            ref.current?.contentWindow?.postMessage("{\"type\":\"Tilt\"}", "*");
            break;
          }
        }
      }
    },
    [isBonusEventReceived, provider],
  );

  return ref;
};

const useStopAutoplayGamePage = () => {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const pathname = useSelector(routerLocationPathnameSelector);
  const id = getNotNil(getGameId(pathname), ["useStopAutoplayNew"], "gameId");

  const isBonusEventReceived = useSelector(isBonusEventReceivedSelectorNew);
  const { provider } = useParamSelector(assertNotNilGameByIdSelector, [id]);

  useEffect(
    () => {
      if (isBonusEventReceived) {
        // todo support for other providers
        switch (provider) {
          case EProviderCode.PRAGMATIC_PLAY: {
            ref.current?.contentWindow?.postMessage("{\"type\":\"Tilt\"}", "*");
            break;
          }
        }
      }
    },
    [isBonusEventReceived, provider],
  );

  return ref;
};

export { useStopAutoplay, useStopAutoplayGamePage };
