<script>
	export let icon = null;
	export let focus = false;
	export let title = null;

	let button;

	$: if (focus) button?.focus();
</script>

<button {title} bind:this={button} on:blur={() => (focus = false)} on:click|stopPropagation>
	<div
		class="button-body {$$slots.default && !icon ? 'text-only' : ''}"
		style={$$slots.default ? 'padding-right: 10px;' : ''}
	>
		{#if icon}
			<img draggable="false" src={icon} alt="" />
		{/if}
		<slot />
	</div>
</button>

<style>
	button {
		border-radius: var(--border-radius);
		transition: 0.2s;
		padding: 0;
		border: 2px solid transparent;
	}

	button:hover {
		background-color: var(--background-hover);
	}

	button:active .button-body {
		position: relative;
		top: 1px;
	}

	button:focus {
		background: var(--background-hover);
		border: 2px solid var(--active-color);
	}

	.text-only {
		padding: 5px 10px;
	}

	.button-body {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	img {
		height: 30px;
		padding: 5px;
		width: auto;
	}
</style>
