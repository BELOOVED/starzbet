import { memo } from "react";

const Noop = memo(() => null);
Noop.displayName = "Noop";

export { Noop };
