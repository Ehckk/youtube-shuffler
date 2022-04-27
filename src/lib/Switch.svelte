<script lang='ts'>
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte/internal';

	export let name: string;
	export let label: string;
	export let store: Writable<boolean>;

	const dispatch = createEventDispatcher();
</script>

<div class="switch_label">{label}</div>
<label class:active={$store} for={name} on:click={() => dispatch('toggle', { store: store })}>
	<input type="checkbox" for={name} bind:checked={$store}/>
	<span></span>
</label>

<style>
	.switch_label {
		margin-right: .5rem;
		font-size: 1.25rem;	
		color: var(--font-color);
	}

	label {
		height: 2rem;
		width: 4rem;
		border-radius: 2rem;
		padding: .5rem;
		position: relative;
		background-color: var(--util-3);
		display: inline-block;
		cursor: pointer;
		transform: all var(--transition);
	}

	label.active {
		background-color: var(--util-2);
	}

	input {
		display: none;
	}

	span {
		background-color: var(--util-1);
		height: 1.5rem;
		width: 1.5rem;
		border-radius: 1.5rem;
		position: absolute;
		top: .25rem;
		left: .25rem;
		transition: transform var(--transition);
	}

	input:checked + span {
		transform: translateX(2rem);
	}

	/* @media only screen and (max-width: 1360px) {
		
	}

	@media only screen and (max-width: 720px) {
		
	} */
</style>