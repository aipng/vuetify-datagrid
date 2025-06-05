<template>
	<div
		v-for="(item, index) in value"
		:key="index"
		class="text-no-wrap"
	>
		{{ item }}
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		value: unknown[],
	}>()
</script>
