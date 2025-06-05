<template>
	<div class="text-center">
		<VBtn
			v-show="!isExpanded(internalItem)"
			:icon="mdiChevronDown"
			title="Rozbalit"
			density="compact"
			@click="toggleExpand(internalItem)"
		/>

		<VBtn
			v-show="isExpanded(internalItem)"
			:icon="mdiChevronUp"
			title="Skrýt"
			density="compact"
			@click="toggleExpand(internalItem)"
		/>
	</div>
</template>

<script setup lang="ts" generic="T">
	import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

	defineProps<{
		internalItem: T,
		isExpanded: (item: T) => boolean,
		toggleExpand: (item: T) => void,
	}>()
</script>
