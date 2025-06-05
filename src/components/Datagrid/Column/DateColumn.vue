<template>
	<span v-if="value" class="text-nowrap">
		{{ formatDate(value) }}
	</span>
</template>

<script setup lang="ts">
	defineProps<{
		value: string | null,
	}>()

	const formatDate = (date: string) => {
		try {
			return new Date(date).toLocaleDateString('cs-CZ')
		} catch {
			return date
		}
	}
</script>
