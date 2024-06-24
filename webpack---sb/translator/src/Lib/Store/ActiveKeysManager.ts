import { type Dispatch } from "redux";
import { debounce, IS_SERVER, type TVoidFn } from "@sb/utils";
import { Logger } from "../Utils/Logger";
import { updateActiveKeysAction } from "./Actions";

/**
 * Keys using t.plain can not be translated by click on node because they are not nodes
 * Therefore active (currently displaying) keys must be stored to see them in translate mode drawer
 * Inside useTranslation hook every translated key must be saved and then removed
 * Dispatching actions directly from useTranslation cause hundreds of actions
 * This class allow to compress a bunch of actions to single one
 *
 * P.S. List of added tKey will not always be correct
 * This happens because tKey must be added from multiple t functions, but it will be deleted by one
 * Solutions with counting t functions that added tKey not working - tKeys will always grow
 * Reason (probably) is because not everywhere t function used only inside component
 */
class ActiveKeysManager {
  private static _tKeys = new Set<string>();
  private static _update: null | TVoidFn = null;
  private static _initializationWarnLogged = false;

  public static initialize(dispatch: Dispatch): void {
    if (IS_SERVER) {
      return;
    }

    this._update = debounce(
      () => {
        dispatch(updateActiveKeysAction(Array.from(this._tKeys)));
      },
      100,
    );
  }

  public static add(tKey: string): void {
    if (IS_SERVER) {
      return;
    }

    this._tKeys.add(tKey);

    this.update();
  }

  public static remove(tKeys: Set<string>): void {
    if (IS_SERVER) {
      return;
    }

    tKeys.forEach((it) => {
      this._tKeys.delete(it);
    });

    this.update();
  }

  private static update() {
    /**
     * ActiveKeysManager initialization proceeded now in Provider component
     * For some reasons in PlayerUI sometimes first call happens before initialization
     * Replace with getNotNil after fix
     */
    if (!this._initializationWarnLogged && !this._update) {
      this._initializationWarnLogged = true;

      Logger.warn.epic("[ActiveKeysManager] Must be initialized first");

      return () => null;
    }

    return this._update;
  }
}

export { ActiveKeysManager };
