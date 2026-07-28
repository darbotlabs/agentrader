/**
 * @evidence index-DTKnr6h1.js:237288
 * mangled: zl → useControllableState
 */
import { useState } from "react";

export function useControllableState({ value, onChange, initialValue }) {
  const controlled = isControlled({ value, onChange, initialValue });
  const [local, setLocal] = useState(controlled ? value : initialValue);
  return [
    controlled ? value : local,
    (next) => {
      if (controlled) onChange?.(next);
      else setLocal(next);
    },
  ];
}
