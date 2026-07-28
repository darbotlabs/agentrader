/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3 (refined mVe)
 * @evidence index-DTKnr6h1.js:249563
 * mangled: mVe → BotEditForm
 */
import { jsx, jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { useMutation } from "@tanstack/react-query";

export function BotEditForm({ bot, strategies }) {
  const { strategy, onStrategyChange, schema } = useStrategyTemplate(bot.template, strategies);
  const { state } = useStrategyParams();
  const trpc = useTRPC();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation(
    trpc.bot.update.mutationOptions({
      onSuccess(updated) {
        showSnackbar("Bot updated successfully");
        setTimeout(() => {
          navigate({ to: pathTo(BOT_TYPE_PATHS[updated.type], updated.id) });
        }, 1000);
      },
    }),
  );

  const handleSubmit = (formValues) => {
    const parsed = jsonSchemaToZod(schema).safeParse(state);
    if (!parsed.success) {
      console.warn("Strategy params are not valid", parsed.error);
      showSnackbar("Strategy params are not valid.", { color: "danger" });
      return;
    }
    const payload = toUpdateBotInput(formValues, strategy, parsed.data);
    mutate(payload);
  };

  const hasParams = strategyHasParams(strategy, strategies);

  return jsxs(Grid, {
    container: true,
    spacing: 2,
    children: [
      jsxs(Grid, {
        md: 6,
        xs: 12,
        children: [
          jsx(Typography, { level: "h2", sx: { mb: 1 }, children: "Strategy settings" }),
          jsx(StrategySelectField, { onChange: onStrategyChange, value: strategy, templates: strategies }),
          jsx(Typography, { level: "body-sm", sx: { mt: 2, mb: 1 }, children: "Strategy params" }),
          hasParams
            ? jsx(StrategyParamsSchemaForm, { schema, strategy })
            : jsx(StrategyNoParamsMessage, { strategy }),
        ],
      }),
      jsxs(Grid, {
        md: 6,
        xs: 12,
        children: [
          jsx(Typography, { level: "h2", sx: { mb: 1 }, children: "Bot settings" }),
          jsx(Suspense, {
            fallback: jsx(Skeleton, {
              animation: "wave",
              height: 300,
              sx: { borderRadius: 8 },
              variant: "rectangular",
              width: "100%",
            }),
            children: jsx(BotSettingsForm, {
              defaultBot: bot,
              isLoading: isPending,
              onSubmit: handleSubmit,
            }),
          }),
        ],
      }),
    ],
  });
}
