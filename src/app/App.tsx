import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { lazy } from "solid-js";
import { AppShell } from "./AppShell";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false },
  },
});

const HomePage = lazy(() => import("~/features/home/HomePage"));
const LibraryPage = lazy(() => import("~/features/library/LibraryPage"));
const ReaderPage = lazy(() => import("~/features/reader/ReaderPage"));
const PracticePage = lazy(() => import("~/features/practice/PracticePage"));
const ProgressPage = lazy(() => import("~/features/progress/ProgressPage"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Focused screens: full width, no app navigation. */}
        <Route path="/papers/:id" component={ReaderPage} />

        <Route path="/" component={AppShell}>
          <Route path="/" component={HomePage} />
          <Route path="/library" component={LibraryPage} />
          <Route path="/practice" component={PracticePage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="*404" component={NotFoundPage} />
        </Route>
      </Router>
    </QueryClientProvider>
  );
}
