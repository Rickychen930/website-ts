import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app-routes";
import ErrorBoundary from "./views/components/error-boundary";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
