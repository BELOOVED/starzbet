import { type TExplicitAny } from "@sb/utils";

const createSrcSet = (...sources: TExplicitAny[]) => sources.map((source, i) => `${source} ${i + 1}x`).join(", ");

export { createSrcSet };
