/**
 * @evidence index-DTKnr6h1.js:12890 ZX
 */
export function RouterProvider({ router, ...rest }) {
  return jsx(RouterContextProvider, {
    router,
    ...rest,
    children: jsx(Matches, {}),
  });
}
