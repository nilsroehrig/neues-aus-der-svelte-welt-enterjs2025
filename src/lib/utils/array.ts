import shuffle from "just-shuffle";

export function toShuffled<T>(array: T[]) {
  const tempArray = array.slice();
  shuffle(tempArray);
  return tempArray;
}