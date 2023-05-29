import { createStyles,Overlay } from "@mantine/core";

import { PromptSync } from "@/features/prompt/sync";
import { PromptToggle, toggleModel } from "@/features/prompt/toggle";
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

	const closeHandler = () => toggleModel.setToggle(false);

	return (
		<div className={classes.promptContainer}>
			<PromptSync>
				<PromptToggle>
					<PromptBar />
					<Overlay
						opacity={0.5}
						zIndex="var(--ui-index-3)"
						onClick={closeHandler}
					/>
				</PromptToggle>
			</PromptSync>
		</div>
	);
};
