<template>
	<a
		v-if="value"
		:href="value"
		target="_blank"
		rel="noopener noreferrer"
	>
		{{ value }}
	</a>
</template>

<script setup lang="ts">
	defineProps<{
		value: string | null,
	}>()
</script>
