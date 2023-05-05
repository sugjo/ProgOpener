import { useState } from "react";

import ResultBar, { SearchResult } from "@/components/search/ResultBar";
import SearchBar from "@/components/search/SearchBar";
import { PromptToggle } from "@/features/prompt-toggle";

import Styles from "./Search.module.css";

function Search() {
	const [searchResult, setSearchResult] = useState<SearchResult>([]);

	const searchHandler = () => {
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

	return (
		<PromptToggle>
			<div className={Styles["search-container"]}>
				<div className={Styles.search}>
					<SearchBar onChange={searchHandler} />
					{searchResult && <ResultBar searchResult={searchResult} />}
				</div>
			</div>
		</PromptToggle>
	);
}

export default Search;
