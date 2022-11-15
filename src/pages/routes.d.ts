import { SvelteComponentTyped } from 'svelte';

declare global {
	interface Window {
		api?: any;
		startup?: any;
		path?: any;
		folderSystem: {
			addFolder(): void;
			removeFolder(path: any): void;
			changeFolder(path: any): void;
			toggleFolder(path: any, disabled: any): void;
		};
	}
}
