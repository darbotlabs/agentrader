/** @evidence index-DTKnr6h1.js:47455 Qke + page-B7EduWBL.js */
import { createRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Sheet } from "@mui/joy";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { SimpleGridForm } from "@/features/grid-bot/SimpleGridForm";
import { trpc } from "@/lib/trpc";
import { useSnackbar } from "@/lib/snackbar";
import { COPY } from "@/lib/contracts";
import { pathTo } from "@/lib/paths";

function GridBotCreatePage() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const create = trpc.gridBot.create.useMutation({
    onSuccess(data: any) {
      showSnackbar(COPY.botCreated);
      setTimeout(() => navigate({ to: pathTo("gridId", data.id) }), 1000);
    },
  });

  return (
    <Page title={`Create ${COPY.gridBot}`}>
      {create.error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {create.error.message}
        </Alert>
      )}
      <Sheet variant="outlined" sx={{ p: 2, maxWidth: 480, borderRadius: "md" }}>
        <SimpleGridForm
          isPending={create.isPending}
          onSubmit={(input) => create.mutate(input)}
        />
      </Sheet>
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/grid-bot/create",
  component: GridBotCreatePage,
});
