import { ActionIcon, createStyles } from "@mantine/core";

import { settingsModel } from "@/entities/settings";
import { Icon } from "@/shared/ui";

type Props = {
	id: string;
}

const useStyles = createStyles((theme) => ({
	editIcon: {
		width: theme.fontSizes.xl,
		height: theme.fontSizes.xl,
	}
}));

export const Edit = ({ id }: Props) => {
	const { classes } = useStyles();
	const updatePath = settingsModel.useStore().updatePath;

	const updateHandler = () => updatePath(id);

	return (
		<ActionIcon color="blue" variant="light" size="md" onClick={updateHandler}>
			<Icon name="edit" className={classes.editIcon}/>
		</ActionIcon>
	);
};
