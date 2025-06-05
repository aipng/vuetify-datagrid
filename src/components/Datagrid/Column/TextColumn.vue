<template>
	{{ value }}
</template>

<script setup lang="ts">
	defineProps<{
		value: string | null,
	}>()
</script>
