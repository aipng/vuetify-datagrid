<template>
	<VCheckboxBtn
		:model-value="Boolean(value)"
		readonly
		:ripple="false"
		class="d-inline-block"
	/>
</template>

<script setup lang="ts">
	import { VCheckboxBtn } from 'vuetify/components'

	defineProps<{
		value: unknown,
	}>()
</script>
