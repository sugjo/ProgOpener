import "virtual:svg-icons-register";
import "./css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Router from "@/pages";

import { WithProviders } from "./providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<WithProviders component={Router}/>
	</React.StrictMode>
);
