import "virtual:svg-icons-register";
import "./css/index.css";

import ReactDOM from "react-dom/client";

import { Router } from "@/pages";

import { withProviders } from "./providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(withProviders(Router)());
