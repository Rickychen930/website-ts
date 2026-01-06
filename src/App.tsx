import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app-routes";
import { ErrorBoundary } from "./views/components/ui";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
