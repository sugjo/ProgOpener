import { useClickOutside, useFocusTrap, useMergedRef } from "@mantine/hooks";

import { usePromptToggle } from "./lib";

interface Props {
    children: React.ReactNode;
}

export const PromptToggle = ({children}: Props) => {
	const [visible, toggleWindow] = usePromptToggle();

	const focusTrap = useFocusTrap();
	const clickOutside = useClickOutside(toggleWindow);

	const LayoutRef = useMergedRef<HTMLDivElement>(clickOutside, focusTrap);

	if (!visible) return null;

	return (
		<div style={{display: "contents"}} ref={LayoutRef}>
			{children}
		</div>
	);
};
