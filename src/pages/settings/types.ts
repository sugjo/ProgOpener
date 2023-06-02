type Tab = {
	id: string;
	title: string;
	panelElement: React.ReactNode;
}

export type Config = {
	defaultTab: string;
	tabs: Tab[];
}
