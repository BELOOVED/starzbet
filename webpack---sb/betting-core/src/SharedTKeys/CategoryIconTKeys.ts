import {
  shared_country_england, shared_country_kosovo,
  shared_country_northernIreland,
  shared_country_scotland,
  shared_country_wales,
  TSharedKey
} from "@sb/translates/shared/SharedTKeys";
import { alpha3CodeTKeys } from "./Alpha3CodeTKeys";

/**
 * Normally country icon is alpha3, ut sometimes alpha3 could not be resolved on backend
 * and parsed name used as country icon.
 *
 * Therefore some hardcoded country names used as keys.
 */

const categoryIconTKeys: Record<string, TSharedKey> = {
  ...alpha3CodeTKeys,
  england: shared_country_england,
  wales: shared_country_wales,
  scotland: shared_country_scotland,
  "northern-ireland": shared_country_northernIreland,
  "kosovo": shared_country_kosovo,
}

export { categoryIconTKeys };
