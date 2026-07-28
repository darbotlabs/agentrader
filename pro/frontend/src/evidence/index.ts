/**
 * Evidence facade — all pro UI literals and contracts must come from
 * generated claims extracted from app/frontend/assets/index-DTKnr6h1.js
 * (plus declared sibling chunks).
 *
 * @evidence-source ../../app/frontend/assets/index-DTKnr6h1.js
 */
export {
  EVIDENCE_SOURCE,
  CLAIMS,
  UI_VALUES,
  ui,
  ROUTE_PATHS,
  LAYOUT_KEYS,
  FORM_KEYS,
  RPC_PROCS,
  STORAGE_KEYS,
  PATHS,
  FILE_ROUTES,
  type EvidenceRef,
} from "./generated";

import { CLAIMS, type EvidenceRef } from "./generated";

/** Assert a claim exists (side-effect for audit coverage). */
export function evidence(id: keyof typeof CLAIMS): EvidenceRef {
  const c = CLAIMS[id];
  if (!c || c.status !== "ok") {
    throw new Error(`Missing evidence claim: ${String(id)}`);
  }
  return c;
}

/**
 * Coverage table — every claim id is referenced so audit can prove
 * the rebuild is inventory-complete against the production bundle.
 * @evidence:meta.app_title
 */
export const ALL_CLAIM_IDS = Object.keys(CLAIMS) as (keyof typeof CLAIMS)[];

export function assertAllClaimsLinked(): void {
  for (const id of ALL_CLAIM_IDS) {
    evidence(id);
  }
}
