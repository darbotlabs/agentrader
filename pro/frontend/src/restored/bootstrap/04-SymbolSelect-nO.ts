/**
 * @evidence index-DTKnr6h1.js:236444
 * mangled: nO → SymbolSelect
 * survivor: displayName = "SymbolSelect"
 */
SymbolSelect.displayName = "SymbolSelect";

export function SymbolSelect({
  exchangeCode,
  isDemoAccount,
  value,
  onChange,
  defaultSymbols,
  disabled,
}) {
  const trpc = useTRPC();
  const [inputValue, setInputValue] = useState(value ? value.currencyPair : "");
  const { data: options } = useQuery(
    trpc.symbol.list.queryOptions(
      { exchangeCode, isDemoAccount },
      { initialData: defaultSymbols },
    ),
  );
  return jsx(Autocomplete, {
    autoHighlight: true,
    disableClearable: true,
    disableListWrap: true,
    getOptionLabel: (s) => s.currencyPair,
    inputValue,
    onChange: (_e, next) => onChange(next),
    onInputChange: (_e, next) => setInputValue(next),
    options,
    value: value || undefined,
    disabled,
  });
}
