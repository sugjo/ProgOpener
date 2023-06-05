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

export const Edit = ({ id }: Props) => {
	const { classes } = useStyles();
	const actions = useActionCreators(settingsModel.actions.path);

	const updateHandler = (id: string) => () => actions.updateThunk(id);

	return (
		<ActionIcon color="blue" variant="light" size="md" onClick={updateHandler(id)}>
			<Icon name="edit" className={classes.editIcon}/>
		</ActionIcon>
	);
};
