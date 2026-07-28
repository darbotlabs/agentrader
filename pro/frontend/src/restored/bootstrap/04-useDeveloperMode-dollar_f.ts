/**
 * @evidence index-DTKnr6h1.js:43674
 * mangled: $f → useDeveloperMode
 * survivor storage key DEVELOPER_MODE_ENABLED
 */
import { useState } from "react";

const DEVELOPER_MODE_ENABLED = "DEVELOPER_MODE_ENABLED";

export function useDeveloperMode() {
  const [enabled, setEnabled] = useState(!!localStorage.getItem(DEVELOPER_MODE_ENABLED));
  return [
    enabled,
    (next) => {
      if (next) localStorage.setItem(DEVELOPER_MODE_ENABLED, "true");
      else localStorage.removeItem(DEVELOPER_MODE_ENABLED);
      setEnabled(next);
    },
  ];
}
