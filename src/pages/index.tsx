import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Search from "./Search";
import Settings from "./Settings";

function Router() {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route>
			<Route path="search" element={<Search />} />
			<Route path="settings" element={<Settings />} />
		</Route>
	));

	return <RouterProvider router={router} />;
}

export default Router;
