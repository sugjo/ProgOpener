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

export const Remove = ({ id }: Props) => {
	const { classes } = useStyles();
	const removePath = settingsModel.useStore().removePath;

	const removeHandler = () => removePath(id);

	return (
		<ActionIcon color="red" variant="light" size="md" onClick={removeHandler}>
			<Icon name="delete" className={classes.editIcon}/>
		</ActionIcon>
	);
};
