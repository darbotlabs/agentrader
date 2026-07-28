/**
 * RESTORED by Minifryer Unfry — chase pass after gVe
 * @evidence index-DTKnr6h1.js:35799
 * mangled: qT → ErrorBoundary
 * kind: class
 * provenance: derivation (structure) + explicit string survivors
 */

class ErrorBoundary extends React.Component {

    constructor(e) {
      super(e), (this.state = { hasError: false });
    }
    static getDerivedStateFromError(e) {
      return { hasError: true, error: e };
    }
    componentDidCatch(e, t) {
      console.log(e);
    }
    render() {
      const { hasError: e, error: t } = this.state;
      return e ? (yA(t) ? jsx(Tfe, { error: t }) : jsx(xfe, { error: t })) : this.props.children;
    }

}