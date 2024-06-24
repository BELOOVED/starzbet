import { type Epic } from "redux-observable";
import { defer, EMPTY, finalize, from, type Observable, of, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type IWidgetController } from "@sb/widget-controller/Types";
import { Logger } from "../../../../common/Utils/Logger";
import { widgetController } from "../Model/WidgetController";
import { widgetControllerInitializeAction } from "../WidgetActions";

const widgetController$: Observable<IWidgetController> = defer(() => {
  if (widgetController.getInstance() === null) {
    return from(widgetController.initialize()).pipe(
      map(() => widgetController.getInstance()),
    );
  }

  return of(widgetController.getInstance());
});

const widgetConnectedEpic = (connection: IWebsocketConnection): Epic => () => widgetController$.pipe(
  map((controller) => controller.setConnection(connection)),
  switchMap(({ abort, promise }) => from(promise).pipe(
    map(() => widgetControllerInitializeAction()),
    finalize(abort),
  )),
  catchError((err) => {
    Logger.warn.epic("Fail widgetController setConnection:", err);

    return EMPTY;
  }),
);

export { widgetConnectedEpic };
