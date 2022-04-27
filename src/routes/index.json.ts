import axios, { type AxiosResponse } from 'axios';
import type { PlaylistItem, PlaylistItemsSearch, PlaylistParameters } from 'src/app';
const key = import.meta.env.VITE_YOUTUBE_TOKEN
const url = "https://www.googleapis.com/youtube/v3/";

export async function getPlaylist(url: string, params?: PlaylistParameters, init=false): Promise<PlaylistItem[]> {
	if (init) return []
	if (!params) {
		params = {}
	}
	params.playlistId = await getPlaylistId(url)
	const res = await getPlaylistItems(params)
	const playlist: PlaylistItem[] = []
	let query = res
	let fail: boolean = false
	while (fail == false) {
		query.items.forEach(item => {
			if (item.snippet.title == 'Deleted video' || item.snippet.title == 'Private video') {
				console.log(item)
			} else {
				playlist.push(item)
			}
		}) 
		params.pageToken = query.nextPageToken
		const newQuery = await getPlaylistItems(params)
		if (query.nextPageToken == undefined) {
			fail = true
		}
		query = newQuery
	}
	return playlist
}

async function getPlaylistId (query: string): Promise<string> {
	query = query.trim()
	let id: string
	switch (true) {
		case (query.includes('youtube.com') || query.includes('youtu.be')) && query.includes('playlist?list='):
			id = String(query.match(/(playlist\?list=)(.*?)(?=(?:\?|$))/)![0].replace('playlist?list=', ''))
			break;
		// case query.length < 20 || query.includes(' '):	
		// 	id = await searchForPlaylist('search', 'id', {q: query, type: 'playlist'}).then((r) => r.items[0] ? r.items[0].id.playlistId : null)
		// 	break;
		default:
			id = query
			break;
	}
	if (!id) {
		return Promise.reject('Invalid URL or query.')
	}
	return id
}

async function getPlaylistItems(params?: PlaylistParameters): Promise<PlaylistItemsSearch> {
	if (!params) {
		params = {}
	}
	let end = 'playlistItems'
	params.key = key
	params.part = 'id, snippet, status, contentDetails'
	params.maxResults = 50
	end = url + end
	const res = await axios.get(end, {params}).then((payload: AxiosResponse) => payload.data)
	if (!res.items[0]) {
		return Promise.reject('Not found')
	}
	return res 
}