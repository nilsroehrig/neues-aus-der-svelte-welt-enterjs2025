type Failure = [Error, null];
type Success<TValue> = [null, TValue];
export type Result<TValue> = Failure | Success<TValue>;

export async function tryCatchAsync<TValue>(
  fn: () => Promise<TValue>,
): Promise<Result<TValue>> {
  try {
    return [null, await fn()];
  } catch (cause) {
    if (cause instanceof Error) {
      return [cause, null];
    }

    return [new Error(String(cause), { cause }), null];
  }
}
