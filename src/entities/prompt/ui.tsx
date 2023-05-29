import { Flex, Popover, ScrollArea } from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";

type Props = {
    inputBar: React.ReactNode;
    resultList: React.ReactNode;
	resultVisible: boolean;
	inputFocusHandler: () => void;
}

export const Layout = (props: Props) => {
	const { inputBar, resultList, resultVisible, inputFocusHandler } = props;

	useWindowEvent("keydown", () => inputFocusHandler);
	useWindowEvent("click", () => inputFocusHandler);

	return (
		<div
			style={{ display: "contents" }}
		>
			<Popover
				opened={resultVisible}
				position="bottom"
				width="target"
				transitionProps={{ transition: "pop", duration: 100 }}
				zIndex="var(--ui-index-4)"
			>
				<Popover.Target>{inputBar}</Popover.Target>
				<Popover.Dropdown p={0}>
					<ScrollArea.Autosize
						mah={"30vh"}
						type="auto"
					>
						<Flex direction={"column"}>
							{resultList}
						</Flex>
					</ScrollArea.Autosize>
				</Popover.Dropdown>
			</Popover>
		</div>
	);
};
