/** @evidence index-DTKnr6h1.js:46966 Mke */
import { createRoute } from "@tanstack/react-router";
import {
  Alert,
  Button,
  CircularProgress,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { Route as layoutRoute } from "../../_layout";
import { Page } from "@/components/Page";
import { trpc } from "@/lib/trpc";
import { useSnackbar } from "@/lib/snackbar";
import { COPY, DEFAULTS } from "@/lib/contracts";

function AccountsPage() {
  const { showSnackbar } = useSnackbar();
  const utils = trpc.useUtils?.() ?? null;
  const list = trpc.exchangeAccount.list.useQuery(undefined, { retry: false });
  const del = trpc.exchangeAccount.delete.useMutation({
    onSuccess: async () => {
      showSnackbar(COPY.accountDeleted ?? "Account deleted");
      await list.refetch();
      utils?.exchangeAccount?.list?.invalidate?.();
    },
  });
  const create = trpc.exchangeAccount.create.useMutation({
    onSuccess: async () => {
      showSnackbar(COPY.accountCreated);
      setOpen(false);
      await list.refetch();
    },
  });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [exchangeCode, setExchangeCode] = useState<string>(DEFAULTS.exchangeCode);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const isDemo = false;

  return (
    <Page
      title={COPY.exchangeAccounts}
      actions={
        <Button onClick={() => setOpen(true)} variant="solid">
          Add exchange account
        </Button>
      }
    >
      {list.isLoading && <CircularProgress />}
      {list.error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {list.error.message}
          {String(list.error.message).includes("UNAUTHORIZED")
            ? " — open self-hosted mode should not require auth; rebuild/restart the daemon."
            : ""}
        </Alert>
      )}
      {list.data && (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Exchange</th>
              <th>Demo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.data.map((a: any) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.exchangeCode}</td>
                <td>{String(a.isDemoAccount)}</td>
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    variant="plain"
                    loading={del.isPending}
                    onClick={() => del.mutate({ id: a.id })}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!list.isLoading && list.data?.length === 0 && (
        <Typography>No accounts yet. Add new exchange.</Typography>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: 360 }}>
          <ModalClose />
          <DialogTitle>Add exchange account</DialogTitle>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Exchange</FormLabel>
              <Select
                value={exchangeCode}
                onChange={(_, v) => setExchangeCode(String(v ?? "OKX"))}
              >
                {["OKX", "BINANCE", "BYBIT", "BITGET", "GATEIO", "KRAKEN", "COINBASE"].map(
                  (c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ),
                )}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>API Key</FormLabel>
              <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Secret</FormLabel>
              <Input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password / Passphrase</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              loading={create.isPending}
              onClick={() =>
                create.mutate({
                  name,
                  exchangeCode,
                  apiKey,
                  secretKey,
                  password: password || undefined,
                  isDemoAccount: isDemo,
                })
              }
            >
              Create
            </Button>
            {create.error && <Alert color="danger">{create.error.message}</Alert>}
          </Stack>
        </ModalDialog>
      </Modal>
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/accounts",
  component: AccountsPage,
});
