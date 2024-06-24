import { type IFinishedEventsState } from "../FinishedEventsState";

const finishedEventsSelectors = ({ finishedEvents }: IFinishedEventsState) => finishedEvents;

const finishedEventsCountSelector = (state: IFinishedEventsState) => finishedEventsSelectors(state).length;

export { finishedEventsCountSelector, finishedEventsSelectors };
