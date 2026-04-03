import { Component, type ReactNode, type ErrorInfo } from "react";
import Button from "@/components/ui/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="text-center px-4">
              <h1 className="font-serif text-4xl text-charcoal mb-4">
                Something went wrong
              </h1>
              <p className="text-charcoal-light mb-8 max-w-md">
                We apologize for the inconvenience. Please try refreshing the page.
              </p>
              <Button href="/">Return Home</Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
