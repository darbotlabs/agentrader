/**
 * @evidence index-DTKnr6h1.js:56744
 * mangled: Vy → useHasChanged
 */
import { useState } from "react";

export function useHasChanged(value) {
  const [prev, setPrev] = useState(value);
  if (value !== prev) {
    setPrev(value);
    return true;
  }
  return false;
}
