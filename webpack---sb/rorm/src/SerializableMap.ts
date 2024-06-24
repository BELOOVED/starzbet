/**
 * ORM located in Redux state
 * Map are not serializable by default
 * Method toJSON makes it serializable using JSON.stringify method
 */
class SerializableMap<V> extends Map<string, V> {
  public toRecord(): Record<string, V> {
    return Object.fromEntries(this.entries());
  }

  public toJSON(): Record<string, V> {
    return this.toRecord();
  }
}

export { SerializableMap };
