import { useClickOutside, useFocusTrap, useMergedRef } from "@mantine/hooks";
import React, { useState } from "react";

import ResultBar, { SearchResult } from "@/components/search/ResultBar";
import SearchBar from "@/components/search/SearchBar";
import { useWindowToggle } from "@/shared/hooks/useWindowToggle";

import Styles from "./Search.module.css";

function Search() {
	const [visible, toggleWindow] = useWindowToggle();
	const [searchResult, setSearchResult] = useState<SearchResult>([]);

	const focusTrap = useFocusTrap();
	const clickOutside = useClickOutside(toggleWindow);
	const searchRef = useMergedRef<HTMLDivElement>(clickOutside, focusTrap);

	const searchHandler = (e: string) => {
		setSearchResult([
			{
				ico: "Genshin Impact.png",
				name: "Genshin Impact",
				path: ""
			},
			{
				ico: "Discord.png",
				name: "Discord",
				path: ""
			},
			{
				ico: "League of Legends.png",
				name: "League of Legends",
				path: ""
			}
		]);
	};

	if (!visible) return null;

	return (
		<div className={Styles["search-container"]}>
			<div ref={searchRef} className={Styles.search}>
				<SearchBar onChange={e => searchHandler(e.target.value)} />
				{searchResult && <ResultBar searchResult={searchResult} />}
			</div>
		</div>

	);
}

export default Search;
