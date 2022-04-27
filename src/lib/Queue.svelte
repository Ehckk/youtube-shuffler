<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import Item from '$lib/Item.svelte';
	import { playlist, searchDotInterval, shift } from '../store';

	onMount(() => {
		clearInterval($searchDotInterval)
		// TODO: More onmount shit
	})

	// TODO: touch support 

	function handleKeyDown(e: KeyboardEvent) {
		e.preventDefault()
		if (e.key == 'Shift') {
			if ($shift == false) {
				$shift = true
			}
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		e.preventDefault()
		if (e.key == 'Shift') {
			if ($shift == true) {
				$shift = false
			}
		}
	}
</script>
<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp}/>

<ul id="queue">
	{#each $playlist as item (item.id)}
	<li animate:flip={{ duration: 300 }}>
		<Item {item} on:moveup on:movedown on:movenow/>
	</li>
	{/each}
	<!-- don't forget to highlight the currently playing track-->
	<!-- replace this with a draggable list -->	

</ul>

<style>
	ul {
		width: 40rem;
		height: fit-content;
		max-height: 30rem;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		scroll-behavior: smooth;
		-ms-overflow-style: none;
		scrollbar-width: none;
		list-style: none;
	}

	li {
		height: 6.75rem;
	}

	ul::-webkit-scrollbar {
		display: none;
	}

	@media only screen and (max-width: 1360px) {		
		ul {
			height: fit-content;
			min-height: 24rem;
			width: 100%;
		}
	}

	@media only screen and (max-width: 720px) {		
		/** mobile devices */
		li {
			height: fit-content;
		}
	}
</style>