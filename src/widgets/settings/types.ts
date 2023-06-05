export type Tab = {
	id: string;
	title: string;
	icon: string;
	panelElement: React.ReactNode;
}

export type TabsConfig = {
	defaultTab: string;
	tabs: Tab[];
}
