import { randomId, useLocalStorage } from "@mantine/hooks";

type Path = {
    id: string;
    path: string;
    status: "on" | "off" | "error";
}

type ChangePath = (id: string, path: Partial<Omit<Path, "id">>) => void

type PathsStorage = {
    pathsMap: Record<string, Path>;
    pathsIds: string[];
}



export const usePaths = () => {
	const [paths, setPaths] = useLocalStorage<PathsStorage>({
		key: "paths",
		defaultValue: {
			pathsMap: {},
			pathsIds: [],
		},
	});

	const addPath = (path: string) => {
		const id = randomId();

		setPaths(({pathsMap, pathsIds}) => {
			const newPath: Path = {
				id,
				path,
				status: "on"
			};

			return {
				pathsMap: {...pathsMap, [id]: newPath},
				pathsIds: [...pathsIds, id]
			};
		});
	};

	const changePath: ChangePath = (id, path) => {
		setPaths(({pathsMap, pathsIds}) => {
			return {pathsMap: {...pathsMap, [id]: {...pathsMap[id], ...path}}, pathsIds};
		});
	};

	const removePath = (id: string) => {
		setPaths(({pathsMap, pathsIds}) => {
			const newPathMap = {...pathsMap};
			delete newPathMap[id];

			const newPathIds = [...pathsIds].filter((pathId) => pathId !== id);

			return {pathsMap: newPathMap, pathsIds: newPathIds};
		});
	};

	return { paths, addPath, removePath, changePath };
};