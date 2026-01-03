import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress ResizeObserver loop limit exceeded error (caused by browser extensions)
const resizeObserverError = window.onerror;
window.onerror = (message, source, lineno, colno, error) => {
  if (
    typeof message === "string" &&
    message.includes("ResizeObserver loop")
  ) {
    return true;
  }
  return resizeObserverError?.(message, source!, lineno!, colno!, error!) ?? false;
};

// Handle insertBefore errors caused by browser translation extensions
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = args[0]?.toString() || "";
  if (
    message.includes("insertBefore") ||
    message.includes("removeChild") ||
    message.includes("NotFoundError")
  ) {
    // These errors are caused by browser extensions modifying the DOM
    // They don't affect app functionality, so we suppress them
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
