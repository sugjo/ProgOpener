import { createStyles } from "@mantine/core";

import { PromptToggle } from "@/features/prompt-toggle";
import { PromptBar } from "@/widgets/prompt-bar";

const useStyles = createStyles((theme) => ({
	promptContainer: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		paddingTop: "30vh",
		paddingBottom: theme.spacing.md,
		minHeight: "100vh"
	}
}));

export const PromptPage = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.promptContainer}>
			<PromptToggle>
				<PromptBar/>
			</PromptToggle>
		</div>
	);
};
