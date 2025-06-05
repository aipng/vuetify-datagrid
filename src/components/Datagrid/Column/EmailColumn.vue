<template>
	<a
		v-if="value"
		:href="`mailto:${value}`"
	>
		{{ value }}
	</a>
</template>

<script setup lang="ts">
	defineProps<{
		value: string | null,
	}>()
</script>
