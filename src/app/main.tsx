import Router from "@/pages";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import 'virtual:svg-icons-register'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withNormalizeCSS
      withCSSVariables
      withGlobalStyles
      theme={{
        globalStyles: (theme) => ({ body: { backgroundColor: "var(--search-background, rgba(0, 0, 0, 0.3))" } }),
        colorScheme: 'dark'
      }}
    >
      <Router />
    </MantineProvider>
  </React.StrictMode>
);
