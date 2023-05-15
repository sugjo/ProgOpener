import { compose } from "@reduxjs/toolkit";

import { withPersist } from "./withPersist";
import { withStore } from "./withStore";
import { withStrict } from "./withStrict";
import { withTheme } from "./withTheme";

export const withProviders = (app: React.ComponentType) => compose<() => React.ReactNode>(
	withPersist, withStore, withTheme, withStrict
)(app);
