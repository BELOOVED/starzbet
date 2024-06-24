import { EEventStatus } from "./EEventStatus";

const finishedStatuses: EEventStatus[] = [
  EEventStatus.finished,
  EEventStatus.cancelled,
  EEventStatus.interrupted,
  EEventStatus.postponed,
  EEventStatus.retired,
  EEventStatus.corrupted,
];

type TFinishedEventStatus =
  EEventStatus.finished
  | EEventStatus.cancelled
  | EEventStatus.interrupted
  | EEventStatus.postponed
  | EEventStatus.retired
  | EEventStatus.corrupted

const isLive = (status: EEventStatus): status is EEventStatus.in_progress => status === EEventStatus.in_progress;

const isPreLive = (status: EEventStatus): status is EEventStatus.not_started => status === EEventStatus.not_started;

const isFinished = (status: EEventStatus): status is TFinishedEventStatus => finishedStatuses.includes(status);

const isCorrupted = (status: EEventStatus): status is EEventStatus.corrupted => status === EEventStatus.corrupted;

const isCancelled = (status: EEventStatus): status is EEventStatus.cancelled => status === EEventStatus.cancelled;

const isPostponed = (status: EEventStatus): status is EEventStatus.postponed => status === EEventStatus.postponed;

export type { TFinishedEventStatus };
export {
  finishedStatuses,
  isLive,
  isPreLive,
  isFinished,
  isCorrupted,
  isCancelled,
  isPostponed
}
