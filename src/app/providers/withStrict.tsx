import React from "react";

export const withStrict = (Component: React.ComponentType) => {
	return () => (
		<React.StrictMode>
			<Component />
		</React.StrictMode>
	);
};
