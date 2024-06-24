import { type TAnyObject, type TStringKeyOf } from "@sb/utils";
import { type IStorage } from "../Model/IStorage";
import { unpack } from "../Utils/Unpack";
import { pack } from "../Utils/Pack";

interface ILocalStorage<Storage extends TAnyObject> extends IStorage<Storage> {
  readonly versions: Record<TStringKeyOf<Storage>, number>;

  getVersionByKey<Key extends TStringKeyOf<Storage>>(key: Key): number;
}

class LocalStorage<Storage extends TAnyObject> implements ILocalStorage<Storage> {
  public readonly versions: Record<TStringKeyOf<Storage>, number>;

  constructor(versions: Record<TStringKeyOf<Storage>, number>) {
    this.versions = versions;
  }

  get length(): number {
    return localStorage.length;
  }

  getVersionByKey<Key extends TStringKeyOf<Storage>>(key: Key): number {
    return this.versions[key];
  }

  get<Key extends TStringKeyOf<Storage>>(key: Key): Storage[Key] | null {
    const item = localStorage.getItem(key);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item !== null
      ? unpack<Key, Storage[Key]>(item, key, this.getVersionByKey(key))
      : null;
  }

  set<Key extends TStringKeyOf<Storage>>(key: Key, value: Storage[Key]): void {
    localStorage.setItem(key, pack(key, value, this.getVersionByKey(key)));
  }

  remove<Key extends TStringKeyOf<Storage>>(key: Key): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export { LocalStorage };

export type { ILocalStorage };

