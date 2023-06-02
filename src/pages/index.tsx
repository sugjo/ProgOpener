import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { PromptPage } from "./Prompt";
import { SettingsPage } from "./settings";

export const Router = () => {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route>
			<Route path="prompt" element={<PromptPage />} />
			<Route path="settings">
				<Route index element={<SettingsPage />} />
				<Route path=":tabValue" element={<SettingsPage />} />
			</Route>
		</Route>
	));

	return <RouterProvider router={router} />;
};
