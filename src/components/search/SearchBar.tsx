import { TextInput } from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";
import React, { useRef } from "react";

import { Icon } from "@/shared/ui";

import Styles from "./SearchBar.module.css";


type Props = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}


const SearchBar = (props: Props) => {
	const ignoreKey = ["Tab", "Shift", "Enter", "Space"] as Array<string>;
	const inputRef = useRef<HTMLInputElement>(null);

	useWindowEvent("keydown", (event) => {
		if (!ignoreKey.includes(event.key)) {
			inputRef.current?.focus();
		}
	});

	return (
		<TextInput
			icon={<Icon name='search' />}
			ref={inputRef}
			className={Styles["search-bar"]}
			size="lg"
			data-autofocus
			placeholder="Поиск"
			onChange={props.onChange}
		/>
	);
};

export default SearchBar;
