<script>
	export let src;
</script>

<img class="icon" {src} draggable="false" alt="" />

<style>
	img {
		user-select: none;
		filter: invert(100%);
		height: 30px;
		width: 30px;
	}
	.icon {
		grid-area: icon;
		margin: 0 15px;
	}
</style>
