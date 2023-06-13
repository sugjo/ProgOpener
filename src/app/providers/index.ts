import compose from "compose-function";

import { withStrict } from "./withStrict";
import { withTheme } from "./withTheme";

export const withProviders = compose<() => React.ReactNode>(
	withTheme, withStrict
);
