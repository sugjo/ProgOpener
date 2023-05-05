import { MantineProvider } from "@mantine/core";

type Props = {
	component: () => React.ReactNode;
}

export const withTheme = ({ component }: Props) => {
	return (
		<MantineProvider
			withNormalizeCSS
			withCSSVariables
			withGlobalStyles
			theme={{
				globalStyles: () => ({ body: { backgroundColor: "var(--search-background, rgba(0, 0, 0, 0.3))" } }),
				colorScheme: "dark"
			}}
		>
			{ component() }
		</MantineProvider>
	);
};
