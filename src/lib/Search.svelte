<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { modalOpen, playlistId } from '../store';

	const dispatch = createEventDispatcher();
	let input: HTMLInputElement;
	let screenX: number;

	function handleKeyDown (e: KeyboardEvent) {
		if (e.code == 'Enter' && !$modalOpen) {
			e.preventDefault()
			handleInput()
		}
	}

	function handleInput() {
		if (input.value == '') {
				dispatch('openmodal', { key: 'errorInput'})
				return
			}
		$playlistId = input.value
		dispatch('query')		
	}
</script>

<svelte:window on:keydown={handleKeyDown} bind:innerWidth={screenX}/>
<form on:submit|preventDefault={handleInput}>
	<label class:hide={screenX <= 720} for="playlist">Playlist Id: </label>
	<button class="help_search" type="button" on:click={() => dispatch('openmodal', { key: 'searchHelp'})}>?</button>
	<input type="text" bind:this={input} placeholder={screenX > 720 ? "Ex: PLLyyQlIzBmeHf7yTLeM0ahRyfoKZXHDLy" : "Enter Youtube Playlist ID"}>
	<button type="submit">
		Search
	</button>
</form>

<style>
	form {
		height: auto;
		width: 100%;
		padding: 2rem 0;
		background-color: var(--color-1);
		position: relative;
		z-index: 3;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	label {
		font-size: 1.25rem;
		text-align: center;
		line-height: 2rem;
	}

	/* TODO: remove redundant CSS */

	input {
		height: 1.5rem;
		width: 28rem;
		margin: 0 .5rem;
		border-radius: .1rem;
		border-width: 0;
		padding: .5rem;
		font-size: 1rem;
		background-color: var(--light-4);
		color: var(--util-2);
    	-webkit-user-select: auto;
    	-khtml-user-select: auto;
		-moz-user-select: element;
		-ms-user-select: text;
    	user-select: contain;    
	}

	input:focus {
		outline: none;
	}

	button {
		height: 2.5rem;
		width: 6rem;
		border-radius: 1.5rem;
		border-width: 0;
		border-style: solid;
		background-color: var(--util-2);
		color: var(--light-4);
		font-size: 1rem;
	}

	button.help_search {
		height: .75rem;
		width: .75rem;
		padding: .125rem;
		margin: 0rem 0rem .5rem .25rem;
		border-radius: 1rem;
		border-width: 0;
		background-color: var(--util-2);
		color: var(--light-4);
		line-height: .5rem;
		font-size: .5rem;
		cursor: pointer;
		transition: all var(--transition);
	}

	@media screen and (max-width: 720px) {
		form {
			flex-direction: column;
		}

		label {
			display: none;
		}

		input {
			width: 20rem;
			margin: 0;
			font-size: .875rem;
		}

		button {
			height: 3rem;
			width: 8rem;
			margin: .5rem;
			font-size: 1.5rem;
		}
	}
</style>