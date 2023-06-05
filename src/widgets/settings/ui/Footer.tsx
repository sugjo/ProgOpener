import { Button, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	footer: {
		display: "flex",
		justifyContent: "flex-end",

		gap: theme.spacing.xs,
		padding: theme.spacing.md,
	}
}));

export const Footer = () => {
	const { classes } = useStyles();

	return (
		<footer className={classes.footer}>
			<Button>Ок</Button>
			<Button
				color="gray"
				variant="default"
			>
				Отмена
			</Button>
		</footer>
	);
};
