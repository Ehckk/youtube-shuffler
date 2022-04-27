<script lang="ts">
	import Switch from "$lib/Switch.svelte";
	import { get } from "svelte/store";
	import { lightMode, shift, shuffleOnlyNext } from "../store";
	import type { Option } from '../app';
	import { createEventDispatcher } from "svelte";
	import Modal from "$lib/Modal.svelte";

	const dispatch = createEventDispatcher();

	let expand: boolean = false;
	let options: Option[] = [
		{
			name: 'light_mode',
			label: 'Light Mode: ',
			store: lightMode
		},
		{
			name: 'shift',
			label: 'Alt Button Mode: ',
			store: shift,
		},
		{
			name: 'shuffle_only_next',
			label: 'Only Shuffle Next',
			store: shuffleOnlyNext
		}
	]

	function handleClick() {
		if (expand) {
			expand = false;
			return
		}
		expand = true;
		return
	}

	function handleToggle(e: CustomEvent) {
		e.detail.store.set(!get(e.detail.store))
	}

	$: $lightMode ? document.documentElement.setAttribute('theme', 'light') : document.documentElement.setAttribute('theme', 'dark');				
</script>

<Modal />
<main>
	<div class="expand_options" class:expand on:click={handleClick}>
		<p>Options</p>
		<div class="tri"></div>
	</div>
	<section class="option_menu" class:expand>
		{#each options as option}
			<div class="switch_box" class:expand>
				<Switch name={option.name} label={option.label} store={option.store} on:toggle={handleToggle}/>
				{#if option.name == 'shift'}
					<button class="help_options" type="submit" on:click={() => dispatch('openmodal', { key: 'optionHelp1'})}>?</button>
				{:else if option.name == 'shuffle_only_next'}
					<button class="help_options" type="submit" on:click={() => dispatch('openmodal', { key: 'optionHelp2'})}>?</button>
				{:else}
					<div></div>
				{/if}
			</div>
		{/each}
	</section>
</main>

<style>
	main {
		width: 100%;
		position: relative;
	}

	.expand_options {
		height: 2rem;
		width: 100%;
		position: relative;
		z-index: 3;
		background-color: var(--color-1);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.expand_options .tri {
		height: .7rem;
		width: .7rem;
		margin-left: .25rem;
		border-width: .7rem .35rem 0rem .35rem;
		border-style: solid;
		border-color: var(--h-color) transparent transparent transparent;
		transition: transform var(--transition);
	}

	.expand_options.expand .tri {
		transform: rotate(180deg);
	}

	.option_menu {
		height: 0rem;
		background-color: var(--color-3);
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		transition: height var(--transition);
	}

	.option_menu.expand {
		visibility: visible;
		opacity: 1;
		height: 5rem;
	}

	.switch_box {
		height: 3rem;
		padding: .5rem;
		position: relative;
		top: -2rem;
		z-index: 2;
		visibility: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all var(--transition);
	}

	.switch_box.expand {
		top: 0rem;
		visibility: visible;
	}

	button.help_options {
		height: 1.25rem;
		width: 1.25rem;
		margin: .5rem;
		padding: .125rem;
		border-radius: 1rem;
		border-width: 0;
		position: relative;
		top: -2rem;
		z-index: 2;
		background-color: var(--util-2);
		color: var(--light-4);
		visibility: hidden;
		line-height: 1rem;
		cursor: pointer;
		transition: all var(--transition);
	}

	.option_menu.expand button.help_options {
		top: 0rem;
		visibility: visible;
	}

	@media only screen and (max-width: 1360px) {
		.option_menu {
			flex-direction: column;
		}

		.switch_box {
			top: -6rem;
			min-width: 20rem;
			justify-content: space-between;
		}

		button.help_options {
			top: -6rem;
		}

		.option_menu.expand {
			height: 15rem;
		}
	}
</style>