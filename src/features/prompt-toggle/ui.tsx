import { useFocusTrap } from "@mantine/hooks";

import { useToggle } from "./lib/useToggle";

interface Props {
    children: React.ReactNode;
}

export const Toggle = ({children}: Props) => {

	const [ visible ] = useToggle();
	const focusTrap = useFocusTrap();

	if (!visible) return null;

	return (
		<div style={{display: "contents"}} ref={focusTrap}>
			{children}
		</div>
	);
};
