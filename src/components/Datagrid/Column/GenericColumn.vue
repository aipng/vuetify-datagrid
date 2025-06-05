<template>
	<component :is="columnComponent" :value="value" />
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	import type { ColumnType } from './ColumnType'

	import ArrayColumn from './ArrayColumn.vue'
	import BooleanColumn from './BooleanColumn.vue'
	import DateColumn from './DateColumn.vue'
	import EmailColumn from './EmailColumn.vue'
	import NumberColumn from './NumberColumn.vue'
	import TextColumn from './TextColumn.vue'
	import UrlColumn from './UrlColumn.vue'

	const props = defineProps<{
		type: ColumnType
		value: ColumnType
	}>()

	const columnComponent = computed(() => {
		switch (props.type) {
			case 'array':
				return ArrayColumn

			case 'boolean':
				return BooleanColumn

			case 'date':
				return DateColumn

			case 'number':
				return NumberColumn

			case 'currency':
				return NumberColumn

			case 'url':
				return UrlColumn

			case 'email':
				return EmailColumn

			default:
				return TextColumn
		}
	})
</script>
