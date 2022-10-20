import General from '@/components/screens/settings/general.svelte';
import Info from '@/components/screens/settings/info.svelte';
import Paths from '@/components/screens/settings/paths.svelte';

export const categories = [
	{
		name: 'Пути',
		icon: 'folder',
		component: Paths
	},
	{
		name: 'Общие',
		icon: 'settings',
		component: General
	},
	{
		name: 'Сведения',
		icon: 'info',
		component: Info
	}
];

export const defaultCategory = Paths;