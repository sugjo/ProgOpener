import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { PromptPage } from "./Prompt";
import { SettingsPage } from "./Settings";

export const Router = () => {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route>
			<Route path="prompt" element={<PromptPage />} />
			<Route path="settings" element={<SettingsPage />} />
		</Route>
	));

	return <RouterProvider router={router} />;
};
