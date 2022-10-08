import General from '@/components/screens/settings/general.svelte';
import Info from '@/components/screens/settings/info.svelte';
import Paths from '@/components/screens/settings/paths.svelte';

export const categories = [
	{
		name: 'Пути',
		icon: 'public://images/folder.svg',
		component: Paths
	},
	{
		name: 'Общие',
		icon: 'public://images/settings.svg',
		component: General
	},
	{
		name: 'Сведения',
		icon: 'public://images/info.svg',
		component: Info
	}
];

export const defaultCategory = Paths;