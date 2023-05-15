import { compose } from "@reduxjs/toolkit";

import { withStrict } from "./withStrict";
import { withTheme } from "./withTheme";

export const withProviders = (app: React.ComponentType) => compose<() => React.ReactNode>(
	withTheme, withStrict
)(app);
