/**
 * @evidence index-DTKnr6h1.js:8565 NK
 * Hash history: location from window.location.hash
 */
export function createBrowserHistory(options) {
  const win = typeof document !== "undefined" ? window : undefined;
  return createHistory({
    window: win,
    parseLocation: () => {
      const parts = win.location.hash.split("#").slice(1);
      const pathname = parts[0] ?? "/";
      const search = win.location.search;
      const hashRest = parts.slice(1);
      const hash = hashRest.length === 0 ? "" : `#${hashRest.join("#")}`;
      const href = `${pathname}${search}${hash}`;
      return parseHref(href, win.history.state);
    },
    createHref: (to) => `${win.location.pathname}${win.location.search}#${to}`,
  });
}
