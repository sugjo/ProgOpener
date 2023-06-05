import { useNavigate, useParams } from "react-router-dom";

import { SettingsLayout } from "@/entities/settings";
import { SettingsSync } from "@/features/settings/sync";
import { SettingsFooter, SettingsHeader, SettingsItems, settingsTabsConfig } from "@/widgets/settings";

export const SettingsPage = () => {
	const navigate = useNavigate();
	const { tabValue } = useParams();
	const { tabs, defaultTab } = settingsTabsConfig;

	const tabChangeHandler = (value: string) => navigate(`/settings/${value}`);

	return (
		<SettingsSync>
			<SettingsLayout
				tabValue={tabValue || defaultTab}
				onTabChange={tabChangeHandler}

				Header={<SettingsHeader tabs={tabs}/>}
				Items={<SettingsItems tabs={tabs}/>}
				Footer={<SettingsFooter/>}
			/>
		</SettingsSync>
	);
};
