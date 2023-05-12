import { createStyles,Input } from "@mantine/core";
import { forwardRef } from "react";

import { Icon } from "@/shared/ui";

type Props = {
	onChange: React.ChangeEventHandler<HTMLInputElement>;

}

const useStyles = createStyles(() => ({
	promptBar: {
		width: "50%",
		zIndex: 400,
	}
}));

export const InputBar = forwardRef<HTMLInputElement, Props>(({onChange}: Props, ref) => {
	const { classes } = useStyles();
	return (
		<Input
			className={classes.promptBar}
			ref={ref}
			onChange={onChange}
			size="xl"
			radius="md"
			placeholder={"Поиск"}
			aria-autocomplete="none"
			data-autofocus
			rightSection={
				<Icon name="search" style={{width: 32, height: 32}} />
			}
		/>
	);
});
