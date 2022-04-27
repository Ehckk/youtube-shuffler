<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<footer>
	<!-- TODO: Add github links -->
	<div class="container">
		<div class="footer_label">
			<h2>Made by Ehck</h2>
			<button class="help_about" type="button" on:click={() => dispatch('openmodal', { key: 'about'})}>?</button>
		</div>
		<div class="footer_links">
			<a href="https://www.buymeacoffee.com/ehck" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 48px !important;width: 173px !important;" ></a>
		</div>		
	</div>

</footer>

<style>

button.help_about {
		height: 1.5rem;
		width: 1.5rem;
		margin: .1rem;
		padding: .125rem;
		border-radius: 1rem;
		border-width: 0;
		background-color: var(--util-2);
		color: var(--light-4);
		cursor: pointer;
		transition: all var(--transition);
	}

	footer {
		width: 100%;
		margin-top: 8rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		text-align: center;
	}

	.container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	h2 {
		height: fit-content;
		width: fit-content;
		margin: .25rem;
	}

	.footer_label {
		height: fit-content;
		width: fit-content;
		display: flex;
		margin: .25rem .5rem;
	}

	.footer_links {
		height: fit-content;
		width: fit-content;
		display: flex;
		margin: .25rem .5rem;
	}
</style>