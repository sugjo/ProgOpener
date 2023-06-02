import { Tabs } from "@mantine/core";

import { Config } from "../types";

type Props = {
	tabs: Config["tabs"]
}

export const PanelList = ({ tabs }: Props) => {
	return (
		<>
			{tabs.map(({id, panelElement}) =>
				<Tabs.Panel key={id} value={id} h="100vh">
					{panelElement}
				</Tabs.Panel>
			)}
		</>
	);
};
