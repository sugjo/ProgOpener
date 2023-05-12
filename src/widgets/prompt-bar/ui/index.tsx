import { mergeRefs, useEventListener } from "@mantine/hooks";
import { useRef, useState } from "react";

import { InputBar } from "./InputBar";
import { Layout } from "./Layout";
import { ResultList } from "./result-list";



export const Prompt = () => {
	const [ prompt, setPrompt ] = useState("");
	const promptInputRef = useRef<HTMLInputElement>(null);

	const [result, setResult] = useState([
		"tst",
		"genshin1",
		"genshin2",
		"genshin3",
		"genshin4",
		"genshin5",
		"genshin6",
		"genshin7",
		"genshin8",
		"genshin9",
		"genshin10",
		"genshin11",
		"genshin12",
		"genshin13",
		"genshin14",
		"genshin15",
		"genshin16",
		"genshin17",
		"genshin18",
		"genshin19",
	]);

	const inputFocus = () => promptInputRef.current?.focus();

	const keydownListenerRef = useEventListener("keydown", inputFocus);
	const mouseListenerRef = useEventListener("click", inputFocus);

	const layoutRef = mergeRefs(keydownListenerRef, mouseListenerRef);

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.currentTarget.value);
	const triggerHandler = (hovered: number) => {
		console.log(result[hovered]);
	};

	return (
		<Layout
			resultVisible={Boolean(prompt)}
			result={
				<ResultList
					onTrigger={triggerHandler}
					result={result}
				/>
			}
			input={
				<InputBar
					ref={promptInputRef}
					onChange={changeHandler}
				/>
			}
			ref={layoutRef}
		/>
	);
};
