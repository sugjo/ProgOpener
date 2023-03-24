import { Tabs } from "@mantine/core";
import React from "react";

import Path from "@/components/settings/ui/Path";

function Settings() {
	return (
		<>
			<Tabs defaultValue="paths" orientation="vertical" variant="outline">
				<Tabs.List grow>
					<Tabs.Tab value="paths">Пути</Tabs.Tab>
					<Tabs.Tab value="general">Общее</Tabs.Tab>
					<Tabs.Tab value="about">Сведения</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="paths" h="100vh">
					<Path/>
				</Tabs.Panel>
				<Tabs.Panel value="general" h="100vh">Messages tab content</Tabs.Panel>
				<Tabs.Panel value="about" h="100vh">Settings tab content</Tabs.Panel>
			</Tabs>

		</>
	);
}

export default Settings;
