/**
 * @evidence index-DTKnr6h1.js:37911 ome
 * Redirect index → bots list
 */
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { pathTo } from "../lib/paths"; // or local pathTo

export function IndexRedirectPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: pathTo("bot") }); // Js("bot") survivor
  }, [navigate]);
  return null;
}
