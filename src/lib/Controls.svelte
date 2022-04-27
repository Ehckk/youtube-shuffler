<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { loop } from '../store';
	
	const dispatch = createEventDispatcher()
	
	let paused = false

	function pauseClicked() {
		if (paused) {
			paused = false
			dispatch('unpause')
			return
		}
		paused = true
		dispatch('pause')
		return
	}
</script>

<div class="controls">
	<button class="control_button shuffle" on:click={() => dispatch('shuffle')}>
		<div class="shuf" style={`background-image: url('shuffle.png');`}> </div>
	</button>
	<button class="control_button previous" on:click={() => dispatch('prev')}>
		<div class="prev">
			<div class="tri"></div>
			<div class="tri"></div>
		</div>
	</button>
	<button class="control_button play-pause" on:click={pauseClicked}>
		<div class="play" class:paused></div>
	</button>
	<button class="control_button next" on:click={() => dispatch('next')}>
		<div class="skip">
			<div class="tri"></div>
			<div class="tri"></div>
		</div>
	</button>
	<button class="control_button repeat" class:active={$loop} on:click={() => dispatch('loop')}>
		<div class="loop" style={`background-image: url('loop.png');`}> </div>
	</button>
	<!-- Sticky position on mobile -->
</div>

<style>
	.controls {
		min-height: 6rem;
		width: 40rem;
		background-color: var(--color-2);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.control_button {
		height: 3.5rem;
		width: 3.5rem;
		margin: .25rem;
		border-style: solid;
		border-radius: 1.75rem;
		border-width: .25rem;
		background-color: var(--color-2);
		border-color: var(--util-2);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.control_button.shuffle {
		margin-right: 1rem;
	}

	.control_button.repeat {
		margin-left: 1rem;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);

		}

		to {
			transform: rotate(360deg);
		}
	}

	.control_button.repeat.active .loop {
		animation-name: spin;
		animation-duration: 1s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	
	.play {
		width: 2rem;
		height: 2rem;
		border-style: solid;
		transition: all .1s ease;
		border-width: 1rem 0 1rem 2rem;
		border-color: transparent transparent transparent var(--util-2);
		margin-left: .25rem;
	}

	.play.paused {
		border-style: double;
		border-width: 0 0 0 1.75rem;
	}

	.skip, .prev {
		width: 2rem;
		height: 2rem;
		transition: all .1s ease;
		display: flex;
	}

	.skip {
		margin-left: .25rem;
	}

	.prev {
		transform: rotate(180deg);
		margin-right: .25rem;
	}

	.tri {
		width: 1rem;
		height: 1rem;
		border-style: solid;
		transition: all .1s ease;
		border-width: 1rem 0 1rem 1rem;
		border-color: transparent transparent transparent var(--util-2);
	}
	.shuf, .loop {
		width: 2rem;
		height: 2rem;
		transition: all .1s ease;
		display: flex;
		background-repeat: no-repeat;
		background-size: cover;
		filter: var(--img-filter-1);
	}

	/* .shuf {
		background-image: url('shuffle.png');
	}

	.loop {
		background-image: url('loop.png');
	} */

	@media only screen and (max-width: 720px) {
		.controls {
			/* TODO: sticky component on mobile devices? */
			height: fit-content;
			width: 100%;
			background-color: var(--color-2);
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		.control_button {
			height: 3.5rem;
			width: 3.5rem;
		}

		.control_button.shuffle {
			margin-right: 0;
		}

		.control_button.repeat {
			margin-left: 0;
		}
	}
</style>