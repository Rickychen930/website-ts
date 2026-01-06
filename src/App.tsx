import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app-routes";
import { ErrorBoundary } from "./views/components/ui";
import ToastProvider from "./components/toast-provider";
import OfflineIndicator from "./components/offline-indicator";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <OfflineIndicator />
        <AppRoutes />
        <ToastProvider />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
