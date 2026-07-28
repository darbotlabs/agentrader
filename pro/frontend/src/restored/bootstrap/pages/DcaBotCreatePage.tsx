/**
 * @evidence index-DTKnr6h1.js:243540 p5e
 * DCA create initializes redux form from exchange/symbol defaults then renders chart+form
 * Deep form field wires still nested (pass 6 gap for full dca form graph)
 */
export function DcaBotCreatePage() {
  // initializes dcaBotForm via dispatch helpers then renders HEe chart + form
  return jsx(Grid, {
    container: true,
    spacing: 2,
    children: jsx(ErrorBoundary, {
      children: jsxs(Fragment, {
        children: [
          jsx(Grid, { md: 9, children: jsx(DcaChartPanel, { /* HEe */ }) }),
          jsx(Grid, { md: 3, children: jsx(DcaCreateFormPanel, {}) }),
        ],
      }),
    }),
  });
}
