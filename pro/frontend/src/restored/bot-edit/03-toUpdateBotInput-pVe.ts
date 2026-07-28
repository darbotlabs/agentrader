/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:249555
 * mangled: pVe → toUpdateBotInput
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function toUpdateBotInput(formValues, template, settings) {

    const {
      botId,
      botName,
      exchangeCode,
      exchangeAccountId,
      symbolId,
      timeframe,
      logging,
    } = formValues;
    const { currencyPairSymbol } = decomposeSymbolId(symbolId);
    return {
      botId,
      data: {
        name: botName,
        template,
        settings,
        timeframe,
        symbol: currencyPairSymbol,
        exchangeAccountId,
        logging,
      },
    };
}