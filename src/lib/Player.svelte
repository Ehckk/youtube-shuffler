<script lang="ts" context="module">
	import type { PlaylistItem } from '../app.d';
	export function getThumbnail(item: PlaylistItem) {
		const thumbnails = item.snippet.thumbnails
		return thumbnails.high ? thumbnails.high.url : thumbnails.medium ? thumbnails.medium.url : thumbnails.standard ? thumbnails.standard.url : thumbnails.default.url
	}
</script>

<script lang='ts'>
	import { onMount } from 'svelte';
	import YoutubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import Queue from '$lib/Queue.svelte';
	import Controls from './Controls.svelte';
	import { playlist, currentPos, shift, loop, shuffleOnlyNext } from '../store';

	export let items: PlaylistItem[]
	$playlist = items.map((item) => { return { id: items.indexOf(item), item: item }})
	
	let current: PlaylistItem = items[0]
	let player: YouTubePlayer
	let options = {
		height: 390,
		width: 640,
		autoplay: true,
	};
	$: bgImg = `background-image: url(${getThumbnail(current)});`

	onMount(() => {
		currentPos.set(0)
		player = YoutubePlayer('player', options)
		player.setVolume(100);
		player.on('ready', () => {
			console.log('ready')
			playVideo()
		})

		player.on('stateChange', (e) => {
			switch (e.data) {
				case 0 && ($currentPos + 1) < items.length: 
					if ($loop) {
						playVideo()
					} else {
						playNext()
					}
					break;
				default:
					break;
			}
		})
	});

	function movePlaylistItem(item: { id: number, item: PlaylistItem}, targetPos: number) {
		items.splice(targetPos, 0, items.splice(item.id, 1)[0]);
		const newPlaylist: { id: number, item: PlaylistItem }[] = items.map((item) => { return { id: items.indexOf(item), item: item }})
		$playlist = newPlaylist
		$currentPos = items.findIndex(item => item == current)
		console.log($playlist)
	}

	function playVideo() {
		current = $playlist[$currentPos].item
		player.loadVideoById(current.contentDetails.videoId)
		player.playVideo()
	}

	function playNext() {
		if (($currentPos + 1 ) < items.length) {
			currentPos.set($currentPos + 1)
		}
		return playVideo()
	}
	
	function playPrev() {
		if ($currentPos > 0) {
			currentPos.set($currentPos - 1)
		}
		return playVideo()
	}

	function handleShuffle() {
		const getRandomItem = (randomItems: PlaylistItem[]): PlaylistItem => randomItems.splice(Math.floor(Math.random() * randomItems.length), 1)[0] 
		let itemsToShuffle: PlaylistItem[];
		let newItems: PlaylistItem[] = [];
		switch (true) {
			case $shuffleOnlyNext:
				itemsToShuffle = $playlist.slice($currentPos + 1).map((item) => item.item);
				for (let i = 0; i < $currentPos + 1; i++) {
					newItems.push($playlist[i].item)
				}
				while (itemsToShuffle.length > 0) {
					newItems.push(getRandomItem(itemsToShuffle))
				}
				$playlist =  newItems.map((item) => { return { id: newItems.indexOf(item), item: item } });
				console.log($playlist.length)
				break;
			default:
				itemsToShuffle = $playlist.map((item) => item.item)
				while (itemsToShuffle.length > 0) {
					newItems.push(getRandomItem(itemsToShuffle))
				}
				$playlist = newItems.map((item) => { return { id: newItems.indexOf(item), item: item }});
				$currentPos = 0
				playVideo()
				break;
		}
	}

	function handleLoop() {
		if ($loop) {
			$loop = false;
		} else {
			$loop = true;
		}
	}

	function handleMoveUp(e: CustomEvent) {
		const itemPos: number = e.detail.item.id
		switch (true) {
			case $shift && itemPos > $currentPos + 1:
				movePlaylistItem(e.detail.item, $currentPos + 1)
				break;
			case $shift && itemPos <= $currentPos + 1 && itemPos > 0:
				movePlaylistItem(e.detail.item, 0)
				break;
			case !$shift && itemPos - 1 == $currentPos && $currentPos == 0:
				movePlaylistItem(e.detail.item, 0)
				break;
			case !$shift && itemPos > 0:
				movePlaylistItem(e.detail.item, itemPos - 1)
				break;
		}
	}

	function handleMoveDown(e: CustomEvent) {
		const itemPos: number = e.detail.item.id
		switch (true) {
			case $shift && itemPos < $currentPos && $currentPos < items.length - 1:
				console.log('lol')
				movePlaylistItem(e.detail.item, $currentPos + 1)
				break;
			case $shift && itemPos >= $currentPos && itemPos < items.length - 1:
				console.log('lol2')
				movePlaylistItem(e.detail.item, items.length - 1)
				break;
			case !$shift && itemPos + 1 == $currentPos && $currentPos == 0:
				console.log('lol3')
				movePlaylistItem(e.detail.item, $currentPos + 1)
				break;
			case !$shift && itemPos < items.length:
				console.log('lol4')
				movePlaylistItem(e.detail.item, itemPos + 1)
				break;
		}
	}

	function handleMoveNow(e: CustomEvent) {
		currentPos.set(e.detail.item.id)
		playVideo()
	}
</script>
<!-- TODO: playlist info box -->
<main>
	<div class="bg-img" style={bgImg}></div>
	<div class="container">
		<div class="video_player">
			<div class="video_box">
				<Queue on:moveup={handleMoveUp} on:movedown={handleMoveDown} on:movenow={handleMoveNow}/>
				<div class="wrapper">
					<div id="player"></div>
					<Controls 
						on:pause={() => player.pauseVideo()} 
						on:unpause={() => player.playVideo()} 
						on:next={playNext} 
						on:prev={playPrev} 
						on:shuffle={handleShuffle}
						on:loop={handleLoop}/>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	/* TODO: fix styles for mobile devices */
	main {
		height: 65vw;
		width: 100%;
		min-height: 80rem;
		position: relative;
	}

	.container {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: center;
	}
	/* TODO: is .container even needed here */

	.bg-img {
		height: 100%;
		width: 100%;
		position: relative;
		top: 0;
		left: 0;
		background-color: #000;
		background-repeat: no-repeat;
		background-size: cover;
		opacity: 0.5;
	}

	.video_player {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.video_box {
		height: 30rem;
		width: 80rem;
		margin-bottom: 8rem;
		display: flex;
		transition: margin-bottom var(--transition);
		/* TODO: Stuff like this except everywhere ^ */
	}

	/* TODO: Mobile compatibility */
	.wrapper {
		display: flex;
		flex-direction: column;
	}

	#player {
		height: 24.375rem;
		width: 40rem;
	}

	@media only screen and (max-width: 1360px) {		
		.wrapper {
			height: 30rem;
		}

		.video_box {
			min-height: fit-content;
			width: 40rem;
			margin-bottom: 0;
			display: flex;
			flex-direction: column-reverse;
			justify-content: space-around;
		}
	}

	@media only screen and (max-width: 720px) {		
		/** mobile devices */
		main {
			min-height: 48rem;
		}

		.video_box {
			min-height: fit-content;
			width: 85%;
		}

		.container {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: center;
		}

		#player {
			height: calc(100vw * (9 / 16));
			width: 100%;
			min-height: 11.5625rem;
			min-width: 20rem;
		}
	}
</style>