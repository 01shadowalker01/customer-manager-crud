export interface ValueObject<T> {
  validate(value: T): boolean;
}
