/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:10771
 * mangled: ju → useNavigate
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useNavigate(c) {

    const { navigate: e, state: t } = Wu(),
      s = _c({ strict: false, select: (i) => i.index });
    return useCallback(
      (i) => {
        const n = i.from ?? (c == null ? undefined : c.from) ?? t.matches[s].fullPath;
        return e({ ...i, from: n });
      },
      [c == null ? undefined : c.from, e],
    );

}