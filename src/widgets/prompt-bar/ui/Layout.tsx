import { Flex, Overlay, Popover, ScrollArea } from "@mantine/core";
import { forwardRef } from "react";

import { setToggle } from "@/features/prompt-toggle/lib";

type Props = {
    result: React.ReactNode;
	resultVisible: boolean;
    input: React.ReactNode;
}

const Layout = forwardRef<HTMLDivElement, Props>(({resultVisible, input, result}: Props, ref) => {
	return (
		<div
			ref={ref}
			style={{ display: "contents" }}
		>
			<Popover
				opened={resultVisible}
				position="bottom"
				width="target"
				transitionProps={{ transition: "pop", duration: 100 }}
				zIndex="var(--ui-index-4)"
			>
				<Popover.Target>{input}</Popover.Target>
				<Popover.Dropdown p={0}>
					<ScrollArea.Autosize
						mah={"30vh"}
						type="auto"
					>
						<Flex direction={"column"}>
							{result}
						</Flex>
					</ScrollArea.Autosize>
				</Popover.Dropdown>
			</Popover>
			<Overlay opacity={0.5} zIndex="var(--ui-index-3)" onClick={() => setToggle(false)} />
		</div>
	);
});

export { Layout };
