import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import App from "./app/App";
import { store } from "./app/store";
import GlobalProvider from "./app/context/GlobalProvider";
import LanguageProvider from "./app/context/LanguageProvider";
import ErrorBoundary from "./app/components/common/ErrorBoundary";
import theme from "./app/theme";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <LanguageProvider>
        <GlobalProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </GlobalProvider>
        </LanguageProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
