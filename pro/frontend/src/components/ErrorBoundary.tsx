/**
 * @evidence index-DTKnr6h1.js:35799 class qT
 */
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Alert, Box, Typography } from "@mui/joy";

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert color="danger" variant="soft">
            <Typography level="title-md">Something went wrong</Typography>
            <Typography level="body-sm">
              {this.state.error?.message ?? "Unknown error"}
            </Typography>
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}
