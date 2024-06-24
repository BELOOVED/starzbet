class Buffer<T = unknown> {
  private pointer = 0;
  private buffer: T[] = [];

  constructor(private size: number) {}

  add(item: T) {
    if (this.buffer.length === this.size) {
      this.buffer[this.pointer] = item;
    } else {
      this.buffer.push(item);
    }

    this.pointer = (this.pointer + 1) % this.size;
  }

  flush() {
    this.pointer = 0;

    return this.buffer.splice(0, this.size);
  }
}

export { Buffer };
