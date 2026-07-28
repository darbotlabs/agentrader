import { BOT_TYPE_PATHS, PATHS } from "./contracts";

export { PATHS, BOT_TYPE_PATHS };

/** @evidence index-DTKnr6h1.js:32365 Js(c, ...e) */
export function pathTo(
  key: keyof typeof PATHS | (typeof BOT_TYPE_PATHS)[keyof typeof BOT_TYPE_PATHS],
  id?: string | number,
): string {
  if (key in PATHS) {
    const entry = PATHS[key as keyof typeof PATHS];
    if (typeof entry === "function") {
      if (id === undefined) throw new Error(`path ${key} requires id`);
      return entry(id);
    }
    return entry;
  }
  // bot type path templates like "grid-bot/:id"
  if (typeof key === "string" && key.includes(":id") && id !== undefined) {
    const base =
      key === BOT_TYPE_PATHS.Bot
        ? "bot"
        : key === BOT_TYPE_PATHS.GridBot
          ? "grid-bot"
          : key === BOT_TYPE_PATHS.DcaBot
            ? "dca-bot"
            : key.split("/")[0];
    return `/dashboard/${base}/${id}`;
  }
  return String(key);
}

export function botTypeToPath(
  type: keyof typeof BOT_TYPE_PATHS,
  id: string | number,
): string {
  return pathTo(BOT_TYPE_PATHS[type], id);
}
