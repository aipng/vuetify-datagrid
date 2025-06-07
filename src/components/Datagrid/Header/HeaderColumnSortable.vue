<template>
	<th>
		<div
			:class="{
				'd-flex justify-space-between': true,
				'text-start': !isCentered,
				'text-center': isCentered,
				clickable: column.sortable,
				inactive: column.sortable && !isSortedAsc,
			}"
			@click="changeSorting"
		>
			<slot name="default">
				{{ column.title }}
			</slot>

			<div
				v-if="column.sortable"
				class="ms-2"
			>
				<VIcon
					v-show="!isSortedDesc"
					:icon="mdiOrderAlphabeticalAscending"
					color="medium-emphasis"
					title="Řazení A-Z"
					:class="{
						disabled: !isSortedAsc
					}"
				/>

				<VIcon
					v-show="isSortedDesc"
					:icon="mdiOrderAlphabeticalDescending"
					color="medium-emphasis"
					title="Řazení Z-A"
				/>
			</div>
		</div>
	</th>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { mdiOrderAlphabeticalAscending, mdiOrderAlphabeticalDescending } from '@mdi/js'
	import type { DataTableSortItem } from 'vuetify'
	import type { DatagridColumnHeader } from '@/components/Datagrid/Header/DatagridColumnHeader'


	const props = defineProps<{
		column: DatagridColumnHeader,
		sortBy: readonly DataTableSortItem[]
	}>()

	const emit = defineEmits<{
		change: [params: DataTableSortItem],
	}>()

	const isCentered = computed(() => {
		return props.column.key === 'id' || props.column.align === 'center'
	})

	const sortItem = computed(() => {
		return props.sortBy.find((item) => item.key === props.column.key) ?? null
	})

	const isSortedAsc = computed((): boolean => {
		if (sortItem.value === null) {
			return false
		}

		return sortItem.value.key === props.column.key && sortItem.value.order === 'asc'
	})

	const isSortedDesc = computed((): boolean => {
		if (sortItem.value === null) {
			return false
		}

		return sortItem.value.key === props.column.key && sortItem.value?.order === 'desc'
	})

	const changeSorting = () => {
		if (!props.column.sortable) {
			return
		}

		emit('change', {
			key: props.column.key,
			order: isSortedAsc.value ? 'desc' : 'asc',
		})
	}
</script>
