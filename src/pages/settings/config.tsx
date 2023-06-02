import { SettingsPaths } from "@/widgets/settings/paths";

import { Config } from "./types";

export const config: Config = {
	defaultTab: "paths",
	tabs: [
		{
			id: "paths",
			title: "Пути",
			panelElement: <SettingsPaths/>
		},
		{
			id: "general",
			title: "Общее",
			panelElement: "Общее"
		},
		{
			id: "about",
			title: "Пути",
			panelElement: "Пути"
		}
	]
};
