import { Button, createStyles } from "@mantine/core";
import { forwardRef } from "react";

import { Icon } from "@/shared/ui";

interface Props {
    item: string;
	active: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = createStyles((theme) => ({
	inner: {
		justifyContent: "flex-start"
	},
	active: {
		backgroundColor: theme.colors.blue[9],
		"&:hover": {
			backgroundColor: theme.colors.blue[8],
		}
	}
}));

export const ResultListItem = forwardRef<HTMLButtonElement, Props>(({ item, active, onClick }: Props, ref) => {

	const { classes, cx } = useStyles();

	return (
		<Button

			ref={ref}
			aria-current={ active }
			variant="subtle"
			color="gray"
			size="lg"
			tabIndex={-1}
			className={cx({ [classes.active]: active })}
			classNames={{
				inner: classes.inner,
			}}
			onClick={onClick}
			leftIcon={
				<Icon name="search" style={{width: 24, height: 24}} />
			}
		>
			{item}
		</Button>
	);
});
