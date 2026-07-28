/**
 * @evidence index-DTKnr6h1.js:249679–249681
 * createRouter → createRoot(#root) → StrictMode → RouterProvider
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root missing");

if (!rootEl.innerHTML) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
