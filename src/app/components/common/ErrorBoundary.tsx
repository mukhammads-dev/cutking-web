import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "@mui/material/Button";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary:", error, info.componentStack);
  }

  private handleReload = () => window.location.assign("/");

  public render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="ck-crash">
        <h1>Something went wrong</h1>
        <p>
          An unexpected error occurred while rendering this page. Go back to the
          home page and try again.
        </p>
        {process.env.NODE_ENV !== "production" ? (
          <pre>{error.message}</pre>
        ) : null}
        <Button variant="contained" onClick={this.handleReload}>
          Back to home
        </Button>
      </div>
    );
  }
}

export default ErrorBoundary;
