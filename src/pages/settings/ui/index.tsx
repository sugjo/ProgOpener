import { Tabs } from "@mantine/core";
import { emit } from "@tauri-apps/api/event";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { startAppListening } from "@/shared/lib/listener-middleware";

import { config } from "../config";
import { PanelList } from "./PanelList";
import { TabsList } from "./TabsList";

export const Settings = () => {
	useLayoutEffect(() => {
		const unlisten = startAppListening({
			predicate: (action, currentState, previousState) => {
				const isChangedState = currentState !== previousState;

				if (!String(action.type).includes("settings")) return false;
				if (isChangedState) return true;

				return false;
			},
			effect: () => emit("settings_update")
		});

		return () => unlisten();
	}, []);

	const navigate = useNavigate();
	const { tabValue } = useParams();

	const { defaultTab, tabs } = config;

	const tabChangeHandler = (value: string) => navigate(`/settings/${value}`);

	return (
		<Tabs
			value={tabValue || defaultTab}
			onTabChange={tabChangeHandler}
			orientation="vertical"
			variant="outline"
		>

			<TabsList tabs={tabs}/>
			<PanelList tabs={tabs}/>
		</Tabs>
	);
};
