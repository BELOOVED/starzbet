import { defer, EMPTY, fromEvent } from "rxjs";
import { IS_SERVER } from "@sb/utils";

const storage$ = defer(() => (
  IS_SERVER ? EMPTY : fromEvent<StorageEvent>(window, "storage")
));

export { storage$ };
