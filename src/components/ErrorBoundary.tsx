import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in application:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF9F1] p-6 text-center text-[#2E2A3B]">
          <div className="max-w-md rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-8 shadow-xl">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF6B5B] text-2xl font-black text-white">
              !
            </span>
            <h1 className="font-display mt-4 text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm font-medium text-[#5B5570]">
              An unexpected error occurred while loading the application.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white hover:bg-[#FF6B5B]"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="w-full rounded-full border-2 border-[#2E2A3B]/20 bg-[#FFF3E4] px-6 py-3 text-sm font-black text-[#2E2A3B] hover:bg-[#FFE3DC]"
              >
                Clear Data & Reset
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
