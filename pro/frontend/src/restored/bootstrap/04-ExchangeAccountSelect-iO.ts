/**
 * @evidence index-DTKnr6h1.js:235675
 * mangled: iO → ExchangeAccountSelect
 * survivor: displayName = "ExchangeAccountSelect"
 */
ExchangeAccountSelect.displayName = "ExchangeAccountSelect";

export function ExchangeAccountSelect({
  value,
  onChange,
  defaultExchangeAccounts,
  disabled,
}) {
  const trpc = useTRPC();
  const [inputValue, setInputValue] = useState(value ? exchangeAccountLabel(value) : "");
  const { data: options } = useQuery(
    trpc.exchangeAccount.list.queryOptions(undefined, { initialData: defaultExchangeAccounts }),
  );
  return jsx(Autocomplete, {
    autoHighlight: true,
    disableClearable: true,
    getOptionLabel: exchangeAccountLabel,
    inputValue,
    isOptionEqualToValue: (opt) => (value ? value.id === opt.id : false),
    onChange: (_e, next) => onChange(next),
    onInputChange: (_e, next) => setInputValue(next),
    options,
    // renderOption retained as gap → Autocomplete option chrome
    value: value || undefined,
    disabled,
  });
}
