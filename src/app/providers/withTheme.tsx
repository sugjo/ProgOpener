import { MantineProvider } from "@mantine/core";

export const withTheme = (Component: React.ComponentType) => {
	return () => (
		<MantineProvider
			withNormalizeCSS
			withCSSVariables
			withGlobalStyles
			theme={{
				globalStyles: () => ({ body: { backgroundColor: "transparent" } }),
				colorScheme: "dark"
			}}
		>
			<Component />
		</MantineProvider>
	);
};
