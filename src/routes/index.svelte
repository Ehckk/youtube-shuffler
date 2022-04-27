<script lang="ts">
	import Search from '$lib/Search.svelte';
	import Options from '$lib/Options.svelte';
	import Player from '$lib/Player.svelte';
	import ErrorHandler from '$lib/ErrorHandler.svelte';
	import { playlistId, searchDots, searchDotInterval, modalKey, modalOpen } from '../store';
	import type { PlaylistItem } from '../app.d';
	import { getPlaylist } from './index.json';
	import Modal from '$lib/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import Footer from '$lib/Footer.svelte';

	let searched = false
	let promise: Promise<PlaylistItem[]> = getPlaylist('', {}, true)
	let dots = ''

	function getDots() {
		if (dots.length == 3) {
			dots = ''
		} else {
			dots += '.'
		}
		$searchDots = dots
	}

	function handleQuery() {
		$searchDotInterval = setInterval(getDots, 500)
		if (!searched) {
			searched = true
		}
		promise = getPlaylist(`https://www.youtube.com/playlist?list=${$playlistId}`);
	}

	function openModal(e: CustomEvent) {
		$modalKey = e.detail.key; 
		$modalOpen = true
	}
</script>
<!-- TODO: fix up some of this mess with the main divs in both Player and here -->

<Modal/>
<Search on:query={handleQuery} on:openmodal={openModal}/>
{#if searched}
	{#await promise}
	<main>
		<div class="container">
			<p>Searching{$searchDots}</p>
		</div>
	</main>
	{:then items}
	<Options on:openmodal={openModal}/>
	<Player {items}/>
	{:catch error}
	<ErrorHandler {error} on:openmodal={openModal}/>
{/await}
{:else}
	<main>
		<div class="container">
			<p>It is recommended to enable autoplaying of videos on this site</p>
		</div>
	</main>
{/if}
<Footer on:openmodal={openModal}/>
<style>

	main {
		height: 60vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.container {
		height: 1rem;
		margin: 2rem;
		width: fit-content;
	}

	p {
		text-align: center;
		font-size: 1rem;
	}
</style>
