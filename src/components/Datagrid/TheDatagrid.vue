<template>
	<div>
		<ThePaginator
			v-if="result.itemsTotal > 5"
			:cursor="cursor"
			:items-total="result.itemsTotal"
			@change="updateCursor"
		/>

		<VDataTableServer
			v-model="selectedItems"
			:sort-by="nativeSortBy"
			:headers="headers"
			:items="result.items"
			:items-length="result.itemsTotal"
			:showSelect="showSelect"
			:showExpand="showExpand"
			hide-default-footer
			must-sort
			class="datagrid-table"
			@update:sortBy="updateSortBy"
		>
			<template #headers="{ columns, sortBy, selectAll, allSelected, someSelected, toggleSort }">
				<tr>
					<template
						v-for="column in columns"
						:key="column.key || column.title"
					>
						<th
							v-if="column?.key === 'data-table-select'"
							class="align-content-center"
						>
							<VCheckboxBtn
								:model-value="allSelected"
								class="d-inline-block"
								:indeterminate="someSelected"
								@update:model-value="value => selectAll(value)"
							/>
						</th>

						<template v-else>
							<HeaderColumnSortable
								v-if="column?.sortable"
								:column="column as DatagridColumnHeader"
								:sortBy="sortBy"
								@change="toggleSort(column)"
							/>

							<HeaderColumn
								v-if="!column?.sortable"
								:column="column as DatagridColumnHeader"
							/>

						</template>
					</template>
				</tr>
			</template>

			<template #item="slotProps">
				<tr>
					<td v-if="showSelect" class="text-center align-content-center">
						<VCheckboxBtn
							:model-value="slotProps.isSelected(slotProps.internalItem)"
							@update:modelValue="slotProps.toggleSelect(slotProps.internalItem)"
							class="d-inline-block"
						/>
					</td>

					<td
						v-for="column in headers"
						:key="column.key"
						:class="{
							'text-center': column.align === 'center',
							'text-end': column.align === 'end',
						}"
					>
						<slot
							:name="`col-${column.key}`"
							v-bind="slotProps"
						>
							<template v-if="column.value">
								{{ column.value(slotProps.item) }}
							</template>

							<GenericColumn
								:type="column.type"
								:value="slotProps.item[column.key]"
							/>
						</slot>
					</td>

					<td v-if="showExpand">
						<slot
							name="itemExpandButton"
							v-bind="slotProps"
						>
							<ExpandButtonColumn
								:internal-item="slotProps.internalItem"
								:is-expanded="slotProps.isExpanded"
								:toggle-expand="slotProps.toggleExpand"
							/>
						</slot>
					</td>
				</tr>
			</template>

			<template v-if="$slots['itemDataTableExpand']" #item.data-table-expand="slotProps">
				<slot name="itemDataTableExpand" v-bind="slotProps" />
			</template>

			<template #expanded-row="slotProps">
				<slot name="expandedRow" v-bind="slotProps">
					<td :colspan="slotProps.columns.length" class="py-2">
						<h3>expandedRow slot (columns, item)</h3>
						columns:
						<pre>{{ slotProps.columns }}</pre>

						item:
						<pre>{{ slotProps.item }}</pre>
					</td>
				</slot>
			</template>
		</VDataTableServer>

		<div
			v-if="result.itemsTotal > 5"
			class="my-5"
		>
			<ThePaginator
				:cursor="cursor"
				:items-total="result.itemsTotal"
				@change="updateCursor"
			/>
		</div>
	</div>
</template>

<script setup lang="ts" generic="TItem extends { [key: string]: any }">
	import { computed } from 'vue'

	import type { CursorPosition } from '@/components/Datagrid/CursorPosition'
	import type { DatagridColumnHeader } from '@/components/Datagrid/Header/DatagridColumnHeader'
	import type { DataTableSortItem } from 'vuetify'
	import type { SortItem } from '@/components/Datagrid/SortItem'

	import ExpandButtonColumn from '@/components/Datagrid/Column/ExpandButtonColumn.vue'
	import GenericColumn from '@/components/Datagrid/Column/GenericColumn.vue'
	import HeaderColumn from '@/components/Datagrid/Header/HeaderColumn.vue'
	import HeaderColumnSortable from '@/components/Datagrid/Header/HeaderColumnSortable.vue'
	import ThePaginator from '@/components/Pagination/ThePaginator.vue'

	type DataResult = {
		itemsTotal: number,
		items: TItem[],
	}

	const {
		headers,
		result,
		showSelect = false,
		showExpand = false,
	} = defineProps<{
		headers: DatagridColumnHeader[],
		result: DataResult,
		showSelect?: boolean
		showExpand?: boolean
	}>()

	const emit = defineEmits<{
		onCursorChange: [position: CursorPosition],
		onSortChange: [item: SortItem],
	}>()

	const selectedItems = defineModel('selectedItems', { default: [] })
	const cursor = defineModel<CursorPosition>('cursor', { required: true })
	const sortBy = defineModel<SortItem>('sortBy', {
		default: {
			sort: 'id',
			order: 'desc',
		},
	})

	const nativeSortBy = computed(() => {
		return [{
			key: sortBy.value.sort,
			order: sortBy.value.order,
		}]
	})

	const updateCursor = (cursor: CursorPosition) => {
		emit('onCursorChange', cursor)
	}

	const updateSortBy = (newSortBy: DataTableSortItem[]) => {
		emit('onSortChange', {
			sort: newSortBy[0].key,
			order: newSortBy[0].order === 'desc'
				? 'desc'
				: 'asc',
		})
	}
</script>
