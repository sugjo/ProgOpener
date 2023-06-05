import { createStyles,Tabs } from "@mantine/core";

type Props = {
	tabValue: string | undefined;
	onTabChange: (value: string) => void;

	Header: React.ReactNode;
	Items: React.ReactNode;
	Footer: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
	settings: {
		display: "grid",
		gridTemplateRows: "min-content 1fr min-content",

		height: "100vh",

		backgroundColor: theme.colors.gray[9],
	}
}));

export const Layout = (props: Props) => {
	const { Header, Items, Footer, tabValue, onTabChange } = props;
	const { classes } = useStyles();

	return (
		<Tabs
			className={classes.settings}
			value={tabValue}
			onTabChange={onTabChange}
		>
			{ Header }
			{ Items }
			{ Footer }
		</Tabs>
	);
};
