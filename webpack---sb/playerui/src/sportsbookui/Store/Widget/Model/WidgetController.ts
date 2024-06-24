import { getType } from "@sb/utils";
import {
  createWidgetController,
  errorAction,
  EWidgetControllerModes,
  type IWidgetController,
} from "@sb/widget-controller/CreateWidgetController";
import { internalErrorAction } from "@sb/widget-controller/Actions";
import { HttpRpcClient } from "@sb/network-bus/RpcClient";
import { sharedProxyUrl } from "../../../../common/Urls";
import { Logger } from "../../../../common/Utils/Logger";

const widgetType = {
  video: "video",
  stats: "stats",
  live: "live",
  overall: "overall",
} as const;

const widgetUrl = process.env.SUMSTATS_WIDGET_URL || "";

type TKeys = keyof Omit<typeof widgetType, "overall">;
type TTabsValues = typeof widgetType[TKeys];

enum EWidgetType {
  VIDEO = "video",
  STATS = "stats",
  LIVE = "live",
  OVERALL = "overall",
}

const getWidgets = (liveWidget: boolean, videoUrl: boolean, statsWidget: boolean) => {
  const result: TTabsValues[] = [];

  if (liveWidget) {
    result.push(widgetType.live);
  }

  if (videoUrl) {
    result.push(widgetType.video);
  }

  if (statsWidget) {
    result.push(widgetType.stats);
  }

  return result;
};

const errorsActionTypes = [
  errorAction,
  internalErrorAction,
].map(getType);

interface IWidget {
  instance: IWidgetController | null;
  getInstance: () => IWidgetController | null;
  initialize: () => Promise<void>;
}

const widgetController: IWidget = {
  instance: null,
  getInstance() {
    return this.instance;
  },
  initialize() {
    return createWidgetController(
      widgetUrl,
      EWidgetControllerModes.production,
      (...actions) => {
        const errorActions = actions.filter((action) => errorsActionTypes.includes(action.type));

        errorActions.forEach(({ payload }) => {
          if (payload) {
            Logger.warn.app("widgetController", "initialize", payload.message);
          }
        });
      },
      new HttpRpcClient(sharedProxyUrl),
    )
      .then((controller) => {
        this.instance = controller;
      });
  },
};

export {
  widgetType,
  getWidgets,
  widgetController,
  type TTabsValues,
  EWidgetType,
};
