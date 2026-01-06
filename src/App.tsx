import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app-routes";
import { ErrorBoundary } from "./views/components/ui";
import ToastProvider from "./components/toast-provider";
import OfflineIndicator from "./components/offline-indicator";
import GoogleAnalytics from "./components/analytics/google-analytics";
import PlausibleAnalytics from "./components/analytics/plausible-analytics";

export default function App() {
  // Get analytics configuration from environment
  const analyticsEnabled = process.env.REACT_APP_ANALYTICS_ENABLED === "true";
  const analyticsType = process.env.REACT_APP_ANALYTICS_TYPE;
  const gaMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const plausibleDomain = process.env.REACT_APP_PLAUSIBLE_DOMAIN;

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Analytics Integration */}
        {analyticsEnabled && analyticsType === "google" && gaMeasurementId && (
          <GoogleAnalytics measurementId={gaMeasurementId} />
        )}
        {analyticsEnabled &&
          analyticsType === "plausible" &&
          plausibleDomain && <PlausibleAnalytics domain={plausibleDomain} />}
        <OfflineIndicator />
        <AppRoutes />
        <ToastProvider />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
