import { type TAnyObject, type TStringKeyOf } from "@sb/utils";
import { pack } from "../Utils/Pack";
import { unpack } from "../Utils/Unpack";
import { type ILocalStorage, LocalStorage } from "./LocalStorage";

type TPrefixedKey<Prefix extends string, Key extends string> = `${Prefix}/${Key}`

class PrefixedLocalStorage<Storage extends TAnyObject> extends LocalStorage<Storage> implements ILocalStorage<Storage> {
  readonly prefix: string;

  constructor(prefix: string, versions: Record<TStringKeyOf<Storage>, number>) {
    super(versions);
    this.prefix = prefix;
  }

  override get<Key extends TStringKeyOf<Storage>>(key: Key): Storage[Key] | null {
    const keyWithPrefix = this.getKeyWithPrefix(key);
    const item = localStorage.getItem(keyWithPrefix);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item !== null
      ? unpack<TPrefixedKey<typeof this.prefix, Key>, Storage[Key]>(item, keyWithPrefix, this.getVersionByKey(key))
      : null;
  }

  override set<Key extends TStringKeyOf<Storage>>(key: Key, value: Storage[Key]): void {
    const keyWithPrefix = this.getKeyWithPrefix(key);

    localStorage.setItem(
      keyWithPrefix,
      pack<TPrefixedKey<typeof this.prefix, Key>, Storage[Key]>(keyWithPrefix, value, this.getVersionByKey(key)),
    );
  }

  override remove<Key extends TStringKeyOf<Storage>>(key: Key): void {
    localStorage.removeItem(this.getKeyWithPrefix(key));
  }

  private getKeyWithPrefix<Key extends TStringKeyOf<Storage>>(key: Key): TPrefixedKey<typeof this.prefix, Key> {
    return `${this.prefix}/${key}`;
  }
}

export { PrefixedLocalStorage };
