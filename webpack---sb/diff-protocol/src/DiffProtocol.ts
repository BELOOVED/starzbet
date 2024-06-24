import { type Epic, type StateObservable } from "redux-observable";
import { concat, defer, EMPTY, merge, type Observable, retry, switchMap, tap } from "rxjs";
import { type Action } from "redux";
import { getNotNil, Buffer } from "@sb/utils";
import { type ISnapshotProvider } from "./ISnapshotSprovider";
import { type IDiffProvider } from "./ISubscribeProvider";
import { Logger } from "./Logger";

type TVersionComparator = (prevVersion: number, nextVersion: number) => boolean;

type TVersionExtractor <P>= (payload: P) => number | undefined;

const monotonicFn: TVersionComparator = (prevVersion, nextVersion) => nextVersion - prevVersion === 1;

const nonMonotonicFn: TVersionComparator = (prevVersion, nextVersion) => nextVersion > prevVersion;

abstract class DiffProtocol<Snapshot = unknown, Diff = unknown, S = unknown> {
  private buffer: Buffer<Diff>;

  private shouldBuffer = false;

  private hasSnapshot = false;

  protected currentVersion = 0;

  protected versionComparator: TVersionComparator = monotonicFn;

  protected abstract versionSnapshotExtractor: TVersionExtractor<Snapshot>;
  protected abstract versionDiffExtractor: TVersionExtractor<Diff>;

  constructor(
    private snapshotProvider: ISnapshotProvider<Snapshot>,
    private diffProvider: IDiffProvider<Diff>,
    private retried = false,
    bufferSize = 100,
    private retryDelay = 3000,
  ) {
    this.buffer = new Buffer(bufferSize);
  }

  protected abstract hasInitSnapshot(state$: StateObservable<S>): boolean;

  protected abstract getCurrentVersion(state$: StateObservable<S>): number;

  protected onInitialize?(): void;

  protected onUpdate?(payload: Diff, state: StateObservable<S>): void;

  protected preRetry?(): Observable<Action>;

  protected onRetry?(): void;

  private subscribeOnUpdate(state$: StateObservable<S>) {
    return this.diffProvider.subscribe().pipe(
      switchMap((payload) => {
        if (this.onUpdate) {
          this.onUpdate(payload, state$);
        }

        if (this.shouldBuffer) {
          this.buffer.add(payload);

          return EMPTY;
        }

        const nextVersion = this.versionDiffExtractor(payload);

        if (nextVersion === undefined) {
          return EMPTY;
        }

        if (nextVersion === 0) {
          throw new Error("Received diff version 0, retrying");
        }

        if (nextVersion < this.currentVersion) {
          throw new Error(`Incorrect update version: currentVersion - ${this.currentVersion}, nextVersion - ${nextVersion}`);
        }

        const shouldGap = this.currentVersion !== 0 && !this.versionComparator(this.currentVersion, nextVersion);

        if (shouldGap) {
          return this.getGap(nextVersion);
        }

        this.updateVersionByDiffs([payload]);

        return this.diffProvider.onLoad(payload);
      }),
    );
  }

  protected getGap(nextVersion: number, currentVersion = this.currentVersion) {
    this.shouldBuffer = true;

    return this.diffProvider.getGap(currentVersion).pipe(
      switchMap((response) => {
        const firstDiff = getNotNil(response[0], ["DiffProtocol"], "firstDiff");

        const gapVersion = this.versionDiffExtractor(firstDiff);

        if (gapVersion === undefined || !this.versionComparator(currentVersion, gapVersion)) {
          if (typeof gapVersion === "number") {
            throw new Error("Gap version is undefined");
          }

          throw new Error(`Incorrect gap version: currentVersion - ${currentVersion}`);
        }

        this.shouldBuffer = false;

        const updatesFromBuffer = this.buffer.flush().filter(
          (it) =>
            response.every((gap) => this.versionDiffExtractor(gap) !== this.versionDiffExtractor(it)),
        );

        const updates = [...response, ...updatesFromBuffer].filter(this.greaterThan(currentVersion));

        this.assertOrder(updates);

        this.updateVersionByDiffs(response);

        return this.diffProvider.onLoad(updates);
      }),
    );
  }

  private getSnapshot() {
    this.shouldBuffer = true;

    return this.snapshotProvider.getSnapshot().pipe(
      switchMap((response) => {
        this.shouldBuffer = false;

        const maxVersion = Math.max(this.currentVersion, this.versionSnapshotExtractor(response) || 0);

        const updates = this.buffer.flush().filter(this.greaterThan(maxVersion));

        if (updates.length === 0) {
          this.updateVersionBySnapshot(response);

          return this.snapshotProvider.onLoad(response);
        }

        const firstDiff = getNotNil(updates[0], ["DiffProtocol"], "firstDiff");

        const firstVersion = this.versionDiffExtractor(firstDiff);

        const shouldGap = firstVersion !== undefined && firstVersion - maxVersion > 1;

        if (shouldGap) {
          return concat(this.snapshotProvider.onLoad(response), this.getGap(maxVersion, maxVersion));
        }

        this.assertOrder(updates);

        this.updateVersionByDiffs(updates);

        return concat(this.snapshotProvider.onLoad(response), this.diffProvider.onLoad(updates));
      }),
    );
  }

  private flow(state$: StateObservable<S>) {
    return defer(() => {
      const shouldSnapshot = this.retried || !this.hasSnapshot;

      if (shouldSnapshot) {
        return concat(
          this.retried && this.preRetry ? this.preRetry() : EMPTY,
          merge(
            this.getSnapshot().pipe(
              tap(() => this.hasSnapshot = true),
            ),
            this.subscribeOnUpdate(state$),
          ),
        );
      }

      return this.subscribeOnUpdate(state$);
    });
  }

  private updateVersionBySnapshot(snapshot: Snapshot) {
    const nextVersion = this.versionSnapshotExtractor(snapshot);

    if (nextVersion !== undefined) {
      this.currentVersion = nextVersion;
    }
  }

  private updateVersionByDiffs(diffs: Diff[]) {
    const last = diffs.at(-1);

    if (last === undefined) {
      return;
    }

    const lastVersion = this.versionDiffExtractor(last);

    if (lastVersion === undefined) {
      return;
    }

    this.currentVersion = lastVersion;
  }

  private assertOrder(diff: Diff[]){
    const validOrder = diff.every((current, index, arr) => {
      const next = arr[index + 1];

      if (next === undefined) {
        return true;
      }

      const nextVersion = this.versionDiffExtractor(next);
      const currentVersion = this.versionDiffExtractor(current);

      if (nextVersion === undefined || currentVersion === undefined) {
        return true;
      }

      return this.versionComparator(currentVersion, nextVersion);
    });

    if (!validOrder) {
      throw new Error("Incorrect version order in diff updates");
    }
  }

  private greaterThan = (currentVersion: number) => (diff: Diff) => {
    const version = this.versionDiffExtractor(diff);

    if (version === undefined) {
      return false;
    }

    return version > currentVersion;
  };

  runEpic: Epic<Action, Action, S> = (_, state$) => {
    this.currentVersion = this.getCurrentVersion(state$);
    this.hasSnapshot = this.hasInitSnapshot(state$);

    if (this.onInitialize) {
      this.onInitialize();
    }

    return this.flow(state$).pipe(
      tap({
        error: (error) => {
          Logger.warn.epic("runEpic", error);

          this.retried = true;

          if (this.onRetry) {
            this.onRetry();
          }
        },
      }),
      retry({
        delay: this.retryDelay,
      }),
    );
  };
}

export { DiffProtocol, nonMonotonicFn };
