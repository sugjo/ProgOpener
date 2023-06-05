import { createStyles, ScrollArea, Tabs } from "@mantine/core";

import { Tab } from "../types";

type Props = {
	tabs: Tab[];
}

const useStyles = createStyles((theme) => ({
	tabsPanel: {
		padding: theme.spacing.md,
	}
}));

export const Items = ({ tabs }: Props) => {
	const { classes } = useStyles();

	return (
		<ScrollArea>
			{tabs.map(({id, panelElement}) =>
				<Tabs.Panel
					key={id}
					value={id}
					className={classes.tabsPanel}
				>
					{panelElement}
				</Tabs.Panel>
			)}
		</ScrollArea>
	);
};
