/**
 * @evidence index-DTKnr6h1.js:37879 rme
 * responsive shell with mobile drawer toggle
 */
export function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = mobileOpen ? "md" : "sm";
  return jsxs("div", {
    children: [
      // App bar + nav drawer (ope/ime) — nested chrome gap labels in LEDGER
      jsx(Outlet, {}),
      children,
    ],
  });
}
