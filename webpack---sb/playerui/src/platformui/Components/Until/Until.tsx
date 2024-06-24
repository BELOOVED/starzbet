// @ts-nocheck
import { Time } from "@sb/utils";

const Until = ({ expiredAt, children }) => (
  Time.isFuture(Number(expiredAt)) && children
);
Until.displayName = "Until";

export { Until };
