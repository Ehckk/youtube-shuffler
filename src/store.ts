import { writable } from "svelte/store";
import type { Writable } from "svelte/store"; 
import type { PlaylistItem } from "src/app";

export const playlistId: Writable<string> = writable('');
export const playlist: Writable<{ id: number, item: PlaylistItem }[]> = writable([]);
export const currentVideoId: Writable<string> = writable('');
export const currentPos: Writable<number> = writable(0);
export const active: Writable<boolean> = writable(false);
export const searchDots: Writable<string> = writable('');
export const searchDotInterval: Writable<NodeJS.Timer> = writable();
export const lightMode: Writable<boolean> = writable(false);
export const loop: Writable<boolean> = writable(false)
export const shift: Writable<boolean> = writable(false);
export const shuffleOnlyNext: Writable<boolean> = writable(false);
export const modalOpen: Writable<boolean> = writable(false);
export const modalKey: Writable<string> = writable('');