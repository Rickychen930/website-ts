import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app-routes";
import { ErrorBoundary } from "./views/components/ui";
import ToastProvider from "./components/toast-provider";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
        <ToastProvider />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
