import { Tabs } from "@mantine/core";

import { Config } from "../types";

type Props = {
	tabs: Config["tabs"]
}

export const TabsList = ({ tabs }: Props) => {
	return (
		<Tabs.List grow>
			{tabs.map(({id, title}) =>
				<Tabs.Tab key={id} value={id}>
					{title}
				</Tabs.Tab>
			)}
		</Tabs.List>
	);
};
