import { Button, ScrollArea } from "@mantine/core";
import React from "react";

import AppIcon from "@/shared/AppIcon";

import Styles from "./ResultBar.module.css";

export type SearchResult = Array<{
    ico: string;
    name: string;
    path: string;
}>

type Props = {
    searchResult: SearchResult
}

const ResultBar = (props: Props) => {
	return (
		<ScrollArea type="auto" offsetScrollbars>
			<div className={Styles["result-bar"]}>
				{
					props.searchResult.map(({ ico, name, path }) => <Button
						key={name}
						size='md'
						color="gray"
						leftIcon={<AppIcon name={ico}/>}
						onClick={() => alert("test")}
						styles={() => ({
							inner: {
								justifyContent: "flex-start"
							}
						})}
					>
						{name}
					</Button>)
				}
			</div>
		</ScrollArea>
	);
};

export default ResultBar;