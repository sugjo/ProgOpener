import { Tabs } from "@mantine/core";
import { emit } from "@tauri-apps/api/event";

import Path from "@/components/settings/ui/Path";
import { startAppListening } from "@/shared/lib/listener-middleware";

export const SettingsPage = () => {
	startAppListening({predicate: (action, currentState, previousState) => {
		const isChangedState = currentState !== previousState;

		if (!String(action.type).includes("settings")) return false;
		if (isChangedState) return true;

		return false;
	}, effect: async () => {
		emit("settings_update");
	}});

	return (
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
	);
};
