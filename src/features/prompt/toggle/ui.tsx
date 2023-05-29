import { useFocusTrap } from "@mantine/hooks";

import { useToggle } from "./model/useToggle";

export const Toggle = ({ children }: React.PropsWithChildren) => {

	const [ visible ] = useToggle();
	const focusTrap = useFocusTrap();

	if (!visible) return null;

	return (
		<div style={{display: "contents"}} ref={focusTrap}>
			{children}
		</div>
	);
};
