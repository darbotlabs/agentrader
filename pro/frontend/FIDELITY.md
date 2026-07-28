# Pro UI fidelity

Native `pro/frontend` implements pro product behavior from:

1. **Production dist** `app/frontend/assets/index-DTKnr6h1.js` (+ lazy pages)  
2. **Live backend contracts** `packages/trpc`  
3. **Minifryer unfry ledger** `src/restored/` (archive of demangled units)

## Guarantees

- All dashboard routes from the dist route tree exist natively.  
- Storage keys, tRPC base path, default backend URL match dist.  
- Critical UI copy (login, bot created/updated, nav labels) match dist survivors.  
- `npm run verify` fails if those contracts drift.

## Non-goals (still iterative)

- Pixel-perfect MUI density of every dist screen  
- Full virtualized autocomplete internals  
- Complete DCA chart panel parity  
- Compiling raw `src/restored/**` fragments as the app entry  

Those remain in the unfry archive for continued restore.
