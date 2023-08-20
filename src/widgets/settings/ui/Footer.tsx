import { Button, createStyles } from "@mantine/core";

import { settingsModel } from "@/entities/settings";

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

	const save = settingsModel.useSettingsPathsStore().savePath;

	return (
		<footer className={classes.footer}>
			<Button onClick={save}>Ок</Button>
			<Button
				color="gray"
				variant="default"
			>
				Отмена
			</Button>
		</footer>
	);
};
