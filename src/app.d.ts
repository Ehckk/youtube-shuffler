/// <reference types="@sveltejs/kit" />

import type { Writable } from "svelte/store";

export interface ImportMetaEnv {
	YOUTUBE_TOKEN: string;
  }

export interface Thumbnail {
    url: string
    width: number
    height: number
}

export interface PlaylistSnippet {    
	publishedAt: string
	channelId: string
	title: string
	description: string
	thumbnails: {
		default: Thumbnail
		medium: Thumbnail
		high: Thumbnail
		standard?: Thumbnail
		maxres?: Thumbnail
	},
	channelTitle: string
	tags: string[]
	localized: {
		title: string
		description: string
	}
}

export interface Option {
	name: string
	label: string
	store: Writable<boolean>
}

export interface PlaylistItem {
    kind: string
    etag: string
    id: string
    snippet: PlaylistItemSnippet
    contentDetails: {
        videoId: string
        videoPublishedAt: string
    },
    status: {
        privacyStatus: string
    }
}

export interface PlaylistItemSnippet {
	publishedAt: string
	channelId: string
	title: string
	description: string
	thumbnails: {
		default: Thumbnail
		medium: Thumbnail
		high: Thumbnail
		standard: Thumbnail
		maxres: Thumbnail
	},
	channelTitle: string
	playlistId: string
	position: number
	resourceId: {
		kind: string
		videoId: string
	}
	videoOwnerChannelTitle: string,
	videoOwnerChannelId: string
}

export interface PlaylistItemsSearch {
    kind: string
    etag: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    },
    items: PlaylistItem[]
    nextPageToken?: string
    prevPageToken?: string
}

export interface PlaylistParameters {
    key?: string | boolean
    part?: string
    playlistId?: string
    id?: string
    h1?: string
    maxResults?: number
    pageToken?: string
}

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
