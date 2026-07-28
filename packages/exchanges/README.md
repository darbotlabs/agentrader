# @agentrader/exchanges

## Usage

### Server

```tsx
import { ExchangeCode } from "@agentrader/types";
import { exchanges, cache } from "@agentrader/exchanges";
import { PrismaCacheProvider } from "@agentrader/exchanges/server";

cache.setCacheProvider(new PrismaCacheProvider());

export default async function Page() {
  const exchange = exchanges[ExchangeCode.OKX]();
  const markets = await exchange.loadMarkets(); // cached in Prisma

  return <div>Markets: {Object.keys(markets).length}</div>;
}
```

### Client

```tsx
"use client";

import { useEffect, useState } from "react";
import { ExchangeCode } from "@agentrader/types";
import { exchanges, cache } from "@agentrader/exchanges";
import { MemoryCacheProvider } from "@agentrader/exchanges/client";

cache.setCacheProvider(new MemoryCacheProvider()); // can be ommited (used by default)

const exchange = exchanges[ExchangeCode.OKX]();

export default function Page() {
  const [markets, setMarkets] = useState<Awaited<
    ReturnType<typeof exchange.loadMarkets>
  > | null>(null);

  useEffect(() => {
    exchange.loadMarkets().then((data) => {
      setMarkets(data);
    });
  }, []);

  if (markets === null) {
    return <div>Loading...</div>;
  }

  return <div>Markets: {Object.keys(markets).length}</div>;
}
```
