<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	export let error: Error
	
	const dispatch = createEventDispatcher();

	onMount(() => {
		if (error.message.endsWith('404')) {
			dispatch('openmodal', { key: 'error404' })
		}
	})
</script>