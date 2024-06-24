// @ts-nocheck
import { Time } from "@sb/utils";

const Then = ({ startedAt, children }) => (
  Time.isPast(Number(startedAt)) && children
);
Then.displayName = "Then";

export { Then };
