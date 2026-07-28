/**
 * @evidence index-DTKnr6h1.js:46966 Mke
 * survivors: "Account deleted"; exchangeAccount.list/delete
 */
export function AccountsPage() {
  const { showSnackbar } = useSnackbar();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { data: accounts, refetch } = useQuery(trpc.exchangeAccount.list.queryOptions());
  const { mutateAsync: deleteAccount } = useMutation(trpc.exchangeAccount.delete.mutationOptions());

  const onDelete = async (account) => {
    await deleteAccount({ id: account.id });
    await queryClient.invalidateQueries(trpc.exchangeAccount.list.queryOptions());
    setEditing(null);
    showSnackbar("Account deleted");
  };

  return jsxs(Box, {
    children: [
      jsx(AccountsTable, {
        accounts,
        onCreateAccountClick: () => setCreateOpen(true),
        onEditAccountClick: (a) => {
          setEditing(a);
          setEditOpen(true);
        },
        onDeleteAccountClick: onDelete,
      }),
      jsx(CreateAccountDialog, {
        onClose: () => setCreateOpen(false),
        onCreated: () => void refetch(),
        open: createOpen,
      }),
      editing
        ? jsx(EditAccountDialog, {
            account: editing,
            onClose: () => setEditOpen(false),
            onUpdated: () => void refetch(),
            open: editOpen,
          })
        : null,
    ],
  });
}
