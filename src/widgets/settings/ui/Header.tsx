import { Tabs } from "@mantine/core";

import { Icon } from "@/shared/ui";

import { Tab } from "../types";

type Props = {
	tabs: Tab[];
}

export const Header = ({ tabs }: Props) => {
	return (
		<Tabs.List>
			{tabs.map(({id, title, icon}) =>
				<Tabs.Tab
					key={id}
					value={id}
					icon={<Icon name={icon} width={24} height={24}/>}
				>
					{title}
				</Tabs.Tab>
			)}
		</Tabs.List>
	);
};
