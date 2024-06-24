import { JSONParse, type TAnyObject, type TStringKeyOf } from "@sb/utils";
import { type IStorage } from "../Model/IStorage";

type TSessionStorage<Storage extends TAnyObject> = IStorage<Storage>

class SessionStorage<Storage extends TAnyObject> implements TSessionStorage<Storage> {
  get length(): number {
    return sessionStorage.length;
  }

  get<Key extends TStringKeyOf<Storage>>(key: Key): Storage[Key] | null {
    const item = sessionStorage.getItem(key);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item !== null
      ? JSONParse<Storage[Key]>(item)
      : null;
  }

  set<Key extends TStringKeyOf<Storage>>(key: Key, value: Storage[Key]): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove<Key extends TStringKeyOf<Storage>>(key: Key): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}

export { SessionStorage };

export type { TSessionStorage };
