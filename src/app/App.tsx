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
const SignInPage = lazy(() => import("~/features/account/SignInPage"));
const WelcomePage = lazy(() => import("~/features/account/WelcomePage"));
const PracticeHubPage = lazy(() => import("~/features/practice/PracticeHubPage"));
const SessionPage = lazy(() => import("~/features/practice/SessionPage"));
const ProgressPage = lazy(() => import("~/features/progress/ProgressPage"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Focused screens: full width, no app navigation. */}
        <Route path="/papers/:id" component={ReaderPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/welcome" component={WelcomePage} />
        <Route path="/practice/session" component={SessionPage} />

        <Route path="/" component={AppShell}>
          <Route path="/" component={HomePage} />
          <Route path="/library" component={LibraryPage} />
          <Route path="/practice" component={PracticeHubPage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="*404" component={NotFoundPage} />
        </Route>
      </Router>
    </QueryClientProvider>
  );
}
