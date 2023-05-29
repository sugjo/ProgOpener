import { useSync } from "./model";

export const Sync = ({ children }: React.PropsWithChildren) => {
	useSync();
	return <>{ children }</>;
};
