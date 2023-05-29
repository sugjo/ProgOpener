import { useRef, useState } from "react";

import { PromptLayout } from "@/entities/prompt";
import { PromptInputBar } from "@/features/prompt/input-bar";
import { PromptResultList } from "@/features/prompt/result-list";

export const Prompt = () => {
	const [prompt, setPrompt] = useState("");
	const [result] = useState([
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

	const inputRef = useRef<HTMLInputElement>(null);

	const isResultVisible = Boolean(prompt);

	const inputFocusHandler = () => inputRef.current?.focus();
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.currentTarget.value);
	const triggerHandler = (hovered: number) => console.log(result[hovered]);

	return (
		<PromptLayout
			inputBar={<PromptInputBar
				ref={inputRef}
				onChange={changeHandler}
			/>}
			resultList={<PromptResultList
				onTrigger={triggerHandler}
				result={result}
			/>}
			inputFocusHandler={inputFocusHandler}
			resultVisible={isResultVisible}
		/>
	);
};
