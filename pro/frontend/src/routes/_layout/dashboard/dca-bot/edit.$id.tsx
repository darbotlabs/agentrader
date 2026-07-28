/** @evidence index-DTKnr6h1.js:249554 page-CAOt1VfL.js */
import { createRoute } from "@tanstack/react-router";
import { Alert, CircularProgress, Typography } from "@mui/joy";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { trpc } from "@/lib/trpc";
import { COPY } from "@/lib/contracts";

function DcaBotEditPage() {
  const { id } = Route.useParams();
  const bot = trpc.dcaBot.getOne.useQuery(Number(id), { retry: false });

  return (
    <Page title={`Edit ${COPY.dcaBot} ${id}`}>
      {bot.isLoading && <CircularProgress />}
      {bot.error && <Alert color="danger">{bot.error.message}</Alert>}
      {bot.data && (
        <Typography component="pre" sx={{ whiteSpace: "pre-wrap", fontSize: "sm" }}>
          {JSON.stringify(bot.data, null, 2)}
        </Typography>
      )}
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/dca-bot/edit/$id",
  component: DcaBotEditPage,
});
