<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import { getThumbnail } from './Player.svelte';
	import type { PlaylistItem } from '../app';
	import { currentPos, shift, playlist } from '../store';

	export let item: { id: number, item: PlaylistItem };

	const dispatch = createEventDispatcher();

	let up: HTMLDivElement
	let down: HTMLDivElement
	let now: HTMLDivElement

	function handleClick(e: MouseEvent) {
		switch (e.currentTarget) {
			case up:
				dispatch('moveup', { item: item })
				break;
			case down:
				dispatch('movedown', { item: item })
				break;
			case now:
				dispatch('movenow', { item: item })
				break;
		}
	}
</script>

<div class="item_box" class:playing={$currentPos == $playlist.findIndex(listItem => listItem == item)} class:shift={$shift}>
	<div class="container">
		<div class="handle">
			<div class="item_button next" bind:this={up} on:click={handleClick}>
				<div class="bar"></div>
				<div class="tri"></div>
			</div>
			<div class="item_button now" bind:this={now} on:click={handleClick}>
				<div class="cir"></div>
			</div>
			<div class="item_button end" bind:this={down} on:click={handleClick}>
				<div class="tri"></div>
				<div class="bar"></div>
			</div>
		</div>
		<img src={getThumbnail(item.item)} alt="fail ;-;">
	</div>
	<div class="info">
		<h2>{item.item.snippet.title}</h2>
		<h3>{item.item.snippet.videoOwnerChannelTitle}</h3>
	</div>	
	<div>

	</div>
</div>

<style>
	.item_box {
		height: 6.75rem;
		border: .1rem var(--color-3) solid; 
		background-image: linear-gradient(var(--color-2), var(--color-1));
		color: var(--font-color);
		list-style: none;
		text-decoration: none;
		text-align: left;
		display: flex;
	}

	.item_box.playing {
		border: .1rem var(--h-color) groove; 
		background-image: linear-gradient(var(--i-color-2), var(--i-color-1));
	}

	.item_box.playing h2, .item_box.playing h3 {
		color: var(--i-font-color);
	}

	.container {
		display: flex;
	}

	.handle {
		height: 100%;
		width: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	.item_button {
		height: 1.5rem;
		width: 1.5rem;
		margin: .1rem .1rem;
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}

	.end .tri, .end .bar { 
		transform: rotate(180deg);
	}

	.bar {
		height: 0;
		width: 1.5rem;
		background-color: var(--util-2);
	}

	.tri {
		height: 1.5rem;
		width: 1.5rem;
		border-style: solid;
		border-width: 0 .75rem 1.5rem .75rem;
		border-color: transparent transparent var(--util-2) transparent;
	}

	.cir {
		height: 1.5rem;
		width: 1.5rem;
		background-color: var(--util-2);
		border-radius: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item_box.shift .bar {
		height: .375rem;
	}

	.item_box.shift .tri {
		height: 1.125rem;
		width: 1.5rem;
		border-width: 0 .75rem 1.125rem .75rem;
	}

	img {
		height: 6.75rem;
		width: 9rem;
		color: black;
		font-size: .75rem;
		line-height: .75rem;
		text-align: center;
	}

	.info {
		height: 100%;
		width: 30.5rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: .5rem;
	}

	div h2 {
		font-size: 1rem;
		line-height: 1rem;
		padding: .25rem;
	}

	div h3 {
		font-size: .75rem;
		line-height: .75rem;
		padding: .25rem;
	}

	@media only screen and (max-width: 720px) {
		.item_box {
			height: fit-content;
		}

		.handle {
			height: 3rem;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
		}

		.container {
			flex-direction: column-reverse;
		}

		.info {
			width: 100%;
		}
	}
</style>