export type Path = {
	path: string;
	status: "on" | "off" | "error";
};

export type Paths = {
	pathsMap: Record<string, Path>;
	pathsIds: string[];
};
