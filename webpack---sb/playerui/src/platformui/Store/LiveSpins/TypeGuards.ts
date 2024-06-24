import { type IStream, type TStream } from "./Model/Types";

const isStream = (stream: TStream): stream is IStream => stream.type === "Stream";

export { isStream };
