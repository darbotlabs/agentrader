/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:24562
 * mangled: Xo → useMutation
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useMutation(c, e) {

    const t = Zm(),
      [s] = useState(() => new Tne(t, c));
    useEffect(() => {
      s.setOptions(c);
    }, [s, c]);
    const i = React.useSyncExternalStore(
        useCallback((r) => s.subscribe(Lr.batchCalls(r)), [s]),
        () => s.getCurrentResult(),
        () => s.getCurrentResult(),
      ),
      n = useCallback(
        (r, a) => {
          s.mutate(r, a).catch(oo);
        },
        [s],
      );
    if (i.error && s6(s.options.throwOnError, [i.error])) throw i.error;
    return { ...i, mutate: n, mutateAsync: i.mutate };

}