import { useRef } from "react";

import { toggleModel } from "@/features/prompt/toggle";

import { useNavigation } from "../model";
import { ListEmpty } from "./ListEmpty";
import { ListItem } from "./ListItem";

type Props = {
	result: string[];
	onTrigger: (active: number) => void;
}

export function ResultList({ result, onTrigger }: Props) {
	const navigationRefs = useRef<Record<number, HTMLButtonElement | null>>({});

	const triggerHandler = (hovered: number) => {
		setHovered(hovered);
		onTrigger(hovered);
		toggleModel.setToggle(false);
	};

	const { hovered, setHovered } = useNavigation({
		navigationRefs,
		elementsLength: result.length,
		onTrigger(hovered) {
			triggerHandler(hovered);
		}
	});

	const resultList = result.map((item, index) => {
		const isActive = hovered === index;
		const clickHandler = () => triggerHandler(index);

		return(
			<ListItem
				key={index}
				item={item}
				active={isActive}
				onClick={clickHandler}
				ref={(element) => (navigationRefs.current[index] = element)}
			/>
		);
	});

	if (result.length <= 0) return <ListEmpty />;

	return (
		<>{ resultList }</>
	);
}
