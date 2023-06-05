import { ActionIcon, createStyles } from "@mantine/core";

import { settingsModel } from "@/entities/settings";
import { useActionCreators } from "@/shared/lib/store";
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
	const actions = useActionCreators(settingsModel.actions.path);

	const removeHandler = (id: string) => () => actions.remove(id);

	return (
		<ActionIcon color="red" variant="light" size="md" onClick={removeHandler(id)}>
			<Icon name="delete" className={classes.editIcon}/>
		</ActionIcon>
	);
};
