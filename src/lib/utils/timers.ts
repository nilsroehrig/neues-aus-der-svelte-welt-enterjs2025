export function wait(amountInMilliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, Math.floor(amountInMilliseconds)))
}