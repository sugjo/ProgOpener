import General from '@/components/screens/settings/general.svelte';
import Info from '@/components/screens/settings/info.svelte';
import Paths from '@/components/screens/settings/paths.svelte';

const defaultCategory = Paths

let categories = [
	{
		title: 'paths.name',
		icon: 'folder',
		component: Paths
	},
	{
		title: 'general.name',
		icon: 'settings',
		component: General
	},
	{
		title: 'info.name',
		icon: 'info',
		component: Info
	}
];

export  {
	defaultCategory,
	categories
}
