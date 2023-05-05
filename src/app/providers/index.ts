import { compose } from "@reduxjs/toolkit";

import { withTheme } from "./withTheme";

export const WithProviders = compose(withTheme);
