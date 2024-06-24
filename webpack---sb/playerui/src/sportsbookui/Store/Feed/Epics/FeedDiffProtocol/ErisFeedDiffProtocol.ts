/* eslint-disable no-console */
import { type StateObservable } from "redux-observable";
import { of } from "rxjs";
import { type IVersionedDiff } from "@sb/sdk/diff/protocol/VersionedDiff";
import { ascend, sort } from "@sb/utils";
import { DiffProtocolWithBaseExtractor } from "@sb/diff-protocol";
import { EPostfix } from "@sb/sdk";
import { type IWithRouterState } from "@sb/router";
import { getLocalStorage, localStorageKeys } from "../../../../../common/Store/LocalStorage/localStorageKeys";
import { measure } from "../../../../LogMeasure";
import { traceDebugSelector } from "../../../DebugMode/Selectors/DebugModeSelectors";
import { type IWithDebugModeState } from "../../../DebugMode/DebugModeState";
import { feedVersionSelector, lineIsReadySelector } from "../../Selectors/FeedSelectors";
import { type IWithFeed } from "../../FeedState";
import { feedResetLineReadyAction } from "../../FeedActions";

type TTrace = Record<string, number>;

interface IPayload extends IVersionedDiff {
  trace: TTrace;
}

const parseServiceInfo = (text: string): [string, string] => {
  const regex = /\[\w+\s+(\w+)/;

  const match = text.match(regex);

  if (match && match[1]) {
    return [match[1], text];
  }

  throw new Error("unknown trace data format");
};

class ErisFeedDiffProtocol extends DiffProtocolWithBaseExtractor<IWithFeed & IWithDebugModeState & IWithRouterState> {
  protected hasInitSnapshot(state$: StateObservable<IWithFeed & IWithRouterState>): boolean {
    return lineIsReadySelector(state$.value);
  }

  protected getCurrentVersion(state$: StateObservable<IWithFeed>): number {
    return feedVersionSelector(state$.value);
  }

  protected override onInitialize() {
    measure("[ws]: start subscribe");
  }

  protected override onUpdate(payload: IPayload, state$: StateObservable<IWithFeed & IWithDebugModeState>) {
    measure("[ws] first update");

    if (traceDebugSelector(state$.value)) {
      this.printTrace(payload.trace, payload.versions[0]);
    }
  }

  protected override preRetry() {
    return of(feedResetLineReadyAction(EPostfix.erisgaming));
  }

  private printTrace = (trace: Record<string, number>, nextVersion: number | undefined) => {
    if (!trace || Object.keys(trace).length === 0) {
      return;
    }

    const minTime = getLocalStorage(localStorageKeys.traceDebugMinTime) || 2000;

    const uiKey = "[service ui fetched] received message";

    const traceWithUi: Record<string, number> = {
      ...trace,
      [uiKey]: Date.now(),
    };

    const serviceKeys = sort(
      ascend((key) => trace[key] || Infinity),
      Object.keys(trace).filter((it) => it.startsWith("[service")),
    ).concat(uiKey);

    if (serviceKeys.length < 2) {
      return;
    }

    let sum = 0;
    let diffLastFirst = 0;
    const result = [] as string[];

    serviceKeys.forEach(
      (current, index, arr) => {
        const next = arr[index + 1];

        if (next === undefined) {
          const firstKey = arr[0];

          if (firstKey === undefined) {
            return;
          }

          const first = traceWithUi[firstKey];

          const last = traceWithUi[current];

          if (first === undefined || last === undefined) {
            return;
          }

          diffLastFirst = last - first;

          return;
        }

        const currentTime = traceWithUi[current];
        const nextTime = traceWithUi[next];

        if (currentTime === undefined || nextTime === undefined) {
          return;
        }

        const diffTime = nextTime - currentTime;

        sum += diffTime;

        const [currentName, currentData] = parseServiceInfo(current);
        const [nextName, nextData] = parseServiceInfo(next);

        const sameService = currentName === nextName;

        const textStart = sameService ? currentName : `${currentName} -> ${nextName}`;

        result.push(`[${diffTime}ms]\t\t${textStart.concat(` ${currentData} -> ${nextData}`)}`);
      },
    );

    if (result.length === 0 || sum < minTime) {
      return;
    }

    console.group(nextVersion);

    result.forEach((it) => {
      console.info(it);
    });

    console.log(`SUM: ${sum}ms; lastTrace - firstTrace: ${diffLastFirst};`);

    console.groupEnd();
  };
}

export { ErisFeedDiffProtocol };
