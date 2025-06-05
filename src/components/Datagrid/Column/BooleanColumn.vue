<template>
	<VCheckboxBtn
		:model-value="Boolean(value)"
		readonly
		:ripple="false"
		class="d-inline-block"
	/>
</template>

<script setup lang="ts">
	defineProps<{
		value: unknown,
	}>()
</script>
