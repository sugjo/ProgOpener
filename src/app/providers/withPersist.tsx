import { PersistGate } from "redux-persist/integration/react";

import { persistor} from "../store";

export const withPersist = (Component: React.ComponentType) => {
	return () => (
		<PersistGate loading={null} persistor={persistor}>
			<Component />
		</PersistGate>
	);
};
