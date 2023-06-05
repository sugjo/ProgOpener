import { createStyles,Flex, Tooltip } from "@mantine/core";

import { AddSettingsPath, EditSettingsPath, RemoveSettingsPath, ToggleSettingsPath } from "@/features/settings/path";
import { useTypedSelector } from "@/shared/lib/store";

const useStyles = createStyles((theme) => ({
	pathTab: {
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing.lg
	},
	path: {
		display: "grid",
		gridTemplateColumns: "min-content 1fr min-content",
		alignItems: "center",
		gap: theme.spacing.xs
	},
	pathText: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		lineClamp: 1,
	}
}));

export const PathsTab = () => {
	const { classes } = useStyles();
	const {	pathsIds, pathsMap } = useTypedSelector((store) => store.settings.path);

	return (
		<div className={classes.pathTab}>
			<AddSettingsPath/>

			<Flex direction="column" gap="xs">
				{pathsIds.map((id) => (
					<div key={id} className={classes.path}>
						<ToggleSettingsPath id={id}/>
						<Tooltip
							label={pathsMap[id].path}
							color="blue"
							position="bottom-start"
							withArrow
						>
							<div className={classes.pathText}>
								{pathsMap[id].path.replaceAll(" ", " ")}
							</div>
						</Tooltip>
						<Flex gap="xs">
							<EditSettingsPath id={id}/>
							<RemoveSettingsPath id={id}/>
						</Flex>
					</div>
				))}
			</Flex>
		</div>
	);
};
