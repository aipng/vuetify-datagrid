<template>
	<th>
		<div
			:class="{
				'text-start': !isCentered,
				'text-center': isCentered,
			}"
			class="align-content-center"
		>
			<slot name="default">
				{{ column.title }}
			</slot>
		</div>
	</th>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	import type { DatagridColumnHeader } from './DatagridColumnHeader'

	const props = defineProps<{
		column: DatagridColumnHeader,
	}>()

	const isCentered = computed(() => {
		return props.column.key === 'id' || props.column.align === 'center'
	})
</script>
