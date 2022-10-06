<script>
	export let src;
</script>

<img class="icon" src={window.path.normalize(src)} draggable="false" alt="" />

<style>
	img {
		user-select: none;
		height: 32px;
		width: 32px;
	}
	.icon {
		margin: 0;
	}
</style>
