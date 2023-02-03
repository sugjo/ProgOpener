import "virtual:svg-icons-register";

import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

import Router from "@/pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider
			withNormalizeCSS
			withCSSVariables
			withGlobalStyles
			theme={{
				globalStyles: () => ({ body: { backgroundColor: "var(--search-background, rgba(0, 0, 0, 0.3))" } }),
				colorScheme: "dark"
			}}
		>
			<Router />
		</MantineProvider>
	</React.StrictMode>
);
