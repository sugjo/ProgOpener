<script>
	export let icon = null;
</script>

<button on:click>
	<div class="button-body">
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
	}

	button:hover {
		background-color: var(--background-hover);
	}

	button:active .button-body {
		position: relative;
		top: 1px;
	}

    img {
        height: 30px;
		padding: 5px;
        width: auto;
        filter: invert(100%);
    }
</style>
