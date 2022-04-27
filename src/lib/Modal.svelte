<script lang="ts">
	import { modalKey, modalOpen } from "../store"; 

	function handleClose() {
		modalOpen.set(false)
		modalKey.set('')
	} 
</script>

<main class:open={$modalOpen}>
	<div class="bg"></div>
	<button class="close_modal" type="submit" on:click={handleClose}>
		<span></span>
		<span></span>
	</button>
	<div class="modal">
		{#if $modalKey == 'optionHelp1'}
			<h2>Help - Alt Button Mode</h2>
			<p> By default, playlist item arrow buttons move the items up/down one position in the queue <br/> Enabling this makes these buttons act in a way that's a bit long winded and I'm too lazy to describe it so here's a visual.</p>
			<div class="flowchart" style={`background-image: url(very_scientific_flowchart.png)`}/>
			<p class="epic_caption">I am an amazing artist</p>
			<p> On PC, you can Shift + click these buttons for alternate item movement </p>
		{:else if $modalKey == 'optionHelp2'}
			<h2>Help - Only Shuffle Next</h2>
			<p>Enabling this makes it so that only songs after the current song are selected for shuffling when shuffled</p>
		{:else if $modalKey == 'errorInput'}
			<h2>Error - No Input</h2>
			<p>Please fill out the Playlist Id field</p>
		{:else if $modalKey == 'error404'}
			<h2>Error - Not Found</h2>
			<p>No playlist was found with that id. <br/> Make sure you have set the playlist's visibility to "Public" or "Unlisted" <br/> Then, copy and past JUST the playlist ID into the search bar</p>
		{:else if $modalKey == 'searchHelp'}
			<h2>Help - Playlist Id</h2>
			<div class="flowchart" style={`background-image: url(very_scientific_flowchart_3.png);`}/>
			<p>Step 1 - Change the visibility of your playlist to either "Public" or "Unlisted"</p>
			<p>Step 2 - Copy and paste ONLY the playlist's ID into the search bar on this site</p>
		{:else if $modalKey == 'about'}
			<h2>About</h2>
			<p>Hello!<br/><br/> This is an app I made because of an issue with browser Youtube's playlist shuffle doing this annoying thing where if shuffle is enabled, it would play the same handful of songs on repeat. Then, when skipping the song, it would just skip around the handful of songs it chose. <br/><br/> For playlists that are a couple hundred songs in length the odds of this happening are statistically improbable so I figured Youtube was doing some algorithmic shenanigans with their shuffling making the randomness of the shuffle... well not all that random.<br/><br/>This app was designed for better, more flexibile shuffling. <br/><br/> Though I made this for my own personal use above all else, you are more than welcome to use it, Youtube API quota permitting. <br/><br/> Through people like you using it, I can potentially get this API key/app verified, increasing the Youtube API quota limit, so I can add more cool features to it, such as being able to export a certain playlist order back to Youtube as a playlist, since Youtube doesn't have a button to randomize playlist order either, at the time of writing this <br/><br/> - Eric/Ehck whatever you know me by <br/><br/></p>
			<a href="https://github.com/Ehckk">Link to my Github</a>
		{/if}
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		position: relative;
		z-index: 500;
		display: none;
	}

	main.open {
		display: block;
	}

	.bg {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: #000;
		opacity: .75;
	}

	.modal {
		height: auto;
		width: clamp(10rem, 100%, 80%);
		border-radius: 1rem;
		padding: 1%;
		top: 10%;
		left: 10%;
		position: absolute;
		z-index: 2;
		background-color: var(--color-3);
		overflow: auto;
	}

	.flowchart {
		min-height: 12rem;
		max-height: 20rem;
		height: 40vw;
		margin: 0 1rem;
		background-size: contain;
		background-repeat: no-repeat;
	}

	h2 {
		margin: .5rem 1rem;
	}

	p.epic_caption {
		font-size: .75rem;
	}

	p {
		margin: 1rem 1rem;
	}
	/* Lock window from scrolling when modal is active */
	button.close_modal {
		height: 3.5rem;
		width: 3.5rem;
		border-radius: 3rem;
		border-width: 0;
		border-style: solid;
		background-color: var(--util-2);
		z-index: 3;
		position: fixed;
		top: 4%;
		right: 4%;
	}

	button.close_modal span {
		height: .4rem;
		width: 2.5rem;
		z-index: 3;
		background-color: var(--light-4);
		position: relative;
		display: inline-block;
	}

	button.close_modal span:nth-child(1) {
		transform: translateY(.6rem) rotate(-45deg);
	}

	button.close_modal span:nth-child(2) {
		transform: translateY(-.7rem) rotate(45deg);
	}
</style>