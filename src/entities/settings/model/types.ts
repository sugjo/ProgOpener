export type Path = {
	path: string;
	isActive: boolean;
};

export type Paths = {
	pathsMap: Record<string, Path>;
	pathsIds: string[];
};
