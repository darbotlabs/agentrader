import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Snackbar, Typography } from "@mui/joy";

type Color = "neutral" | "success" | "danger" | "warning" | "primary";

type SnackbarApi = {
  showSnackbar: (message: string, opts?: { color?: Color }) => void;
};

const Ctx = createContext<SnackbarApi | null>(null);

/** @evidence index-DTKnr6h1.js:32422 Ud → useSnackbar */
export function useSnackbar(): SnackbarApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider");
  return ctx;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<Color>("neutral");

  const showSnackbar = useCallback((msg: string, opts?: { color?: Color }) => {
    setMessage(msg);
    setColor(opts?.color ?? "success");
    setOpen(true);
  }, []);

  const api = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        color={color}
        variant="soft"
      >
        <Typography level="body-sm">{message}</Typography>
      </Snackbar>
    </Ctx.Provider>
  );
}
