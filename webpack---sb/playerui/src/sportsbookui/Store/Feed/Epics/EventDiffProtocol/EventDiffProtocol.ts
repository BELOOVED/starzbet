/* eslint-disable no-console */
import { type Observable, tap } from "rxjs";
import { type StateObservable } from "redux-observable";
import {
  DiffProtocolWithBaseExtractor,
  type IDiffProvider,
  type ISnapshotProvider,
  nonMonotonicFn,
} from "@sb/diff-protocol";
import { type IVersionedDiff } from "@sb/sdk/diff/protocol/VersionedDiff";
import { type IFrontendFeed } from "@sb/sdk/sportsbook/frontserver/api/dto/FrontendFeed";
import { eventDebugSelector } from "../../../DebugMode/Selectors/DebugModeSelectors";
import { type IWithDebugModeState } from "../../../DebugMode/DebugModeState";
import { type IWithFeed } from "../../FeedState";
import { eventByIdSelector } from "../../Selectors/FeedSelectors";

class EventDiffProtocol extends DiffProtocolWithBaseExtractor<IWithFeed> {
  protected override versionComparator = nonMonotonicFn;

  constructor(
    private sp: ISnapshotProvider<IFrontendFeed>,
    protected dp: IDiffProvider<IVersionedDiff>,
    private eventId: string,
  ) {
    super(sp, dp);
  }

  protected hasInitSnapshot() {
    return false;
  }

  protected getCurrentVersion() {
    return 0;
  }

  protected override getGap(nextVersion: number): Observable<never> {
    throw new Error(
      `Missed update in EventDiffProtocol, versions: current-${this.currentVersion} next-${nextVersion}, but gap not supported`,
    );
  }

  protected override onUpdate(_: IVersionedDiff, state$: StateObservable<IWithFeed & IWithDebugModeState>) {
    if(!eventDebugSelector(state$.value)){
      return;
    }

    this.sp.getSnapshot().pipe(
      tap((payload) => {
        const sports = Object.values(payload.sports);

        const firstSport = sports[0];

        if(!firstSport){
          return;
        }

        const categories = firstSport.categories;

        const firstCategory = Object.values(categories)[0];

        if(!firstCategory){
          return;
        }

        const tournaments = firstCategory.tournaments;

        const firstTournament = Object.values(tournaments)[0];

        if(!firstTournament){
          return;
        }

        const event = firstTournament.events[this.eventId];

        if(!event){
          return;
        }

        const eventFromSnapshot = event.diff;

        if(!eventFromSnapshot) {
          console.info(`%c[EVENT_DEBUG: ${this.eventId}]: no event in snapshot `, "color: cyan");

          return;
        }

        const eventFromState = Object.assign({}, eventByIdSelector(state$.value as any, this.eventId));

        if(!eventFromState) {
          console.info(`%c[EVENT_DEBUG: ${this.eventId}]: no event in state `, "color: red");

          return;
        }

        delete eventFromSnapshot["changeType"];
        delete eventFromState["id"];
        delete eventFromState["sportId"];
        delete eventFromState["tournamentId"];
        delete eventFromState["categoryId"];

        const equal = JSON.stringify(eventFromSnapshot) === JSON.stringify(eventFromState);

        const versionFromSnapshot = payload.versions[0];
        const versionFromState = this.currentVersion;

        if(!versionFromSnapshot) {
          return;
        }

        if(equal) {
          console.info(`%c[EVENT_DEBUG: ${this.eventId}]: events are equal`, "color: cyan", { versionFromSnapshot, versionFromState });
        } else if(versionFromState > versionFromSnapshot) {
          console.info(
            `%c[EVENT_DEBUG: ${this.eventId}]: versionFromState more recent`,
            "color: cyan",
            {
              versionFromSnapshot,
              eventFromSnapshot,
              versionFromState,
              eventFromState,
            },
          );
        } else{
          console.info(
            `%c[EVENT_DEBUG: ${this.eventId}]: events are not equal`,
            "color: red",
            {
              versionFromSnapshot,
              eventFromSnapshot,
              versionFromState,
              eventFromState,
            },
          );
        }
      }),
    ).subscribe();
  }
}

export { EventDiffProtocol };
