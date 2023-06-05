import { TabsConfig } from "./types";
import { PathsTab } from "./ui/PathsTab";

export const tabsConfig: TabsConfig = {
	defaultTab: "paths",
	tabs: [
		{
			id: "paths",
			title: "Пути",
			icon: "folder_open",
			panelElement: <PathsTab/>
		},
		{
			id: "general",
			title: "Общее",
			icon: "tune",
			panelElement: "Общее"
		},
		{
			id: "about",
			title: "О приложении",
			icon: "info",
			panelElement: "О приложении"
		}
	]
};
