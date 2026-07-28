/**
 * @evidence index-DTKnr6h1.js:237505
 * mangled: BEe → pickDefaultExchangeAccount
 */
export function pickDefaultExchangeAccount(accounts) {
  if (accounts.length === 0) throw new Error("Empty exchange accounts array provided");
  return accounts[0];
}
