/**
 * @evidence index-DTKnr6h1.js:35815 Pfe
 * ErrorBoundary → theme → tRPC/query → redux → snackbar → outlet
 * Intermediate providers still mangled: Gce,fue,_ie,Bue,vfe,xJ,CL
 */
export function RootProviders() {
  return jsx(ErrorBoundary, {
    children: jsx(ThemeProvider, {
      children: jsx(TrpcQueryProvider, {
        children: jsx(ReduxProvider, {
          children: jsx(SnackbarProvider, {
            children: jsx(CssBaselineProvider, {
              children: jsx(RouterOutlet, {}),
            }),
          }),
        }),
      }),
    }),
  });
}
