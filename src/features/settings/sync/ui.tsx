import { useSync } from "./model";

interface Props extends React.PropsWithChildren {
	sync?: boolean;
}

export const Sync = ({ children, sync = false }: Props) => {
	useSync(sync);
	return <>{ children }</>;
};
