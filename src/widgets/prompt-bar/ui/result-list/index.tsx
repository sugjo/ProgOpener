import { useRef } from "react";

import { setToggle } from "@/features/prompt-toggle";

import { useNavigation } from "../../lib/useNavigation";
import { ResultListEmpty } from "./ResultListEmpty";
import { ResultListItem } from "./ResultListItem";

type Props = {
	result: string[];
	onTrigger: (active: number) => void;
}

export function ResultList({ result, onTrigger }: Props) {
	const navigationRefs = useRef<Record<number, HTMLButtonElement | null>>({});

	const triggerHandler = (hovered: number) => {
		setHovered(hovered);
		onTrigger(hovered);
		setToggle(false);
	};

	const { hovered, setHovered } = useNavigation({
		navigationRefs,
		elementsLength: result.length,
		onTrigger(hovered) {
			triggerHandler(hovered);
		}
	});

	if (result.length <= 0) return <ResultListEmpty />;

	return (
		<>
			{result.map((item, index) => {
				const isActive = hovered === index;
				const clickHandler = () => triggerHandler(index);

				return(
					<ResultListItem
						key={index}
						item={item}
						active={isActive}
						onClick={clickHandler}
						ref={(element) => (navigationRefs.current[index] = element)}
					/>
				);
			})}
		</>
	);
}
