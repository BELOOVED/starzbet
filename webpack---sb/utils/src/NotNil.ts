function notNil<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export { notNil }
