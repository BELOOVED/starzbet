import { isDev, isE2E, isTest } from "./IsEnv";

/**
 * Some check and logic could be used to prevent incorrect usage of functions/variables/method etc.
 * In those cases this flag could be used to enable such logic except production
 */
const USE_STRICT_MODE = isDev || isTest || isE2E;

export { USE_STRICT_MODE };
