<template>
	{{ value ? value.toLocaleString('cs-CZ') : '' }}
</template>

<script setup lang="ts">
	defineProps<{
		value: number | null,
	}>()
</script>
