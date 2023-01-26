import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import SearchBar from "@/components/search/SearchBar";
import ResultBar, { SearchResult } from "@/components/search/ResultBar";
import { useClickOutside, useFocusTrap, useMergedRef } from "@mantine/hooks";
import Styles from './Search.module.css'

function Search() {
    const [visible, setVisible] = useState(true);
    const [searchResult, setSearchResult] = useState<SearchResult>([]);

    useEffect(() => {
        if (!window.__TAURI_IPC__) setVisible(true);

        let unlisten = listen("search_toggled", ({ payload }) => {
            setVisible(payload as boolean);
        });

        return () => { unlisten.then((f) => f()) };
    }, []);

    const focusTrap = useFocusTrap();
    const clickOutside = useClickOutside(() => invoke("toggle_search"));
    const searchRef = useMergedRef<HTMLDivElement>(clickOutside, focusTrap);

    const searchHandler = (e: string) => {
        setSearchResult([
            {
                ico: "/vite.svg",
                name: "Vite",
                path: ""
            },
            {
                ico: "/tauri.svg",
                name: "tauri",
                path: ""
            }
        ])
    }

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
