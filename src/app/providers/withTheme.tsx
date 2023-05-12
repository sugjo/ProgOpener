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
				globalStyles: () => ({ body: { backgroundColor: "transparent" } }),
				colorScheme: "dark"
			}}
		>
			{ component() }
		</MantineProvider>
	);
};
