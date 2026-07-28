/**
 * @evidence index-DTKnr6h1.js:35815 Pfe provider stack
 */
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { useState } from "react";
import { CssBaseline } from "@mui/joy";
import { store } from "@/store";
import { createTrpcClient, trpc } from "@/lib/trpc";
import { SnackbarProvider } from "@/lib/snackbar";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function RootProviders() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTrpcClient());

  return (
    <ErrorBoundary>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <SnackbarProvider>
              <CssBaseline />
              <Outlet />
            </SnackbarProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorBoundary>
  );
}

export const Route = createRootRoute({
  component: RootProviders,
});
