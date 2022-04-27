<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import '../app.css'
</script>

<svelte:body />

<Modal/>
<nav>
	<h1>Youtube Shuffler</h1>
</nav>
<main >
	<slot></slot>
</main>

<style>
	nav {
		height: fit-content;
		width: 100%;
		padding: .25rem;
		position: relative;
		z-index: 3;
		background-color: var(--color-2);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	h1 {
		height: auto;
		width: auto;
		padding: .5rem;
		color: var(--font-color);
		font-size: 2.5rem;
		line-height: 2.5rem;
	}
</style>