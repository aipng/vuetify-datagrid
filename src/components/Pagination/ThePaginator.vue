<template>
	<div class="d-md-flex align-center justify-md-space-between w-lg-66 mx-auto text-center">
		<div class="my-4 my-md-0">
			<strong>{{ firstOnPage }} - {{ lastOnPage }} z {{ itemsTotal }}</strong>
		</div>

		<div class="my-2 my-md-0">
			<VBtnGroup
				variant="outlined"
				divided
			>
				<VBtn
					:disabled="cursor.page === 1"
					:icon="mdiPageFirst"
					height="40"
					width="40"
					title="První stránka"
					@click="goToPage(1)"
				/>

				<VBtn
					:disabled="cursor.page === 1"
					:icon="mdiChevronLeft"
					height="40"
					width="40"
					title="Předchozí stránka"
					@click="prevPage"
				/>

				<VBtn
					v-for="pageNumber in pageSteps"
					:key="pageNumber"
					size="small"
					height="40"
					width="40"
					:class="{
						'highlight': pageNumber === cursor.page,
					}"
					@click="goToPage(pageNumber)"
				>
					{{ pageNumber }}
				</VBtn>

				<VBtn
					:disabled="cursor.page === totalPages"
					:icon="mdiChevronRight"
					height="40"
					width="40"
					title="Následující stránka"
					@click="nextPage"
				/>

				<VBtn
					:disabled="cursor.page === totalPages"
					:icon="mdiPageLast"
					height="40"
					width="40"
					title="Poslední stránka"
					@click="goToPage(totalPages)"
				/>
			</VBtnGroup>
		</div>

		<div class="pb-2 text-center">
			<div class="d-inline-block">
				<VSelect
					v-model="itemsPerPage"
					:items="pageSizes"
					style="max-width: 90px"
					variant="outlined"
					density="compact"
					hide-details
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue'
	import { mdiChevronLeft, mdiChevronRight, mdiPageFirst, mdiPageLast } from '@mdi/js'
	import { VBtn, VBtnGroup, VSelect } from 'vuetify/components'

	type Cursor = {
		page: number
		pageSize: number
	}


	const {
		cursor,
		pageSizes = [10, 20, 50],
		itemsTotal = 35,
	} = defineProps<{
		cursor: Cursor,
		pageSizes?: number[]
		itemsTotal?: number
	}>()

	const emit = defineEmits<{
		change: [cursor: Cursor],
	}>()


	const itemsPerPage = ref(cursor.pageSize)
	const totalPages = computed(() => Math.ceil(itemsTotal / cursor.pageSize))
	const firstOnPage = computed(() => Math.max(1, (cursor.page - 1) * cursor.pageSize + 1))
	const lastOnPage = computed(() => Math.min(cursor.page * cursor.pageSize, itemsTotal))

	watch(itemsPerPage, (value) => {
		emit('change', {
			page: 1,
			pageSize: value,
		})
	})

	const pageSteps = computed(() => {
		const maxVisiblePageNumbers = 5
		const maxPageNumberSiblings = 2

		// how many page numbers before/after the actual page
		let startPage = Math.max(1, cursor.page - maxPageNumberSiblings)
		let endPage = Math.min(totalPages.value, cursor.page + maxPageNumberSiblings)

		// close to the first page, need to change the end page
		if (cursor.page - maxPageNumberSiblings < 1) {
			endPage = Math.min(totalPages.value, endPage + (maxPageNumberSiblings - cursor.page + 1))
		}

		// close to the last page, need to change the first page
		if (cursor.page + maxPageNumberSiblings > totalPages.value) {
			startPage = Math.max(1, startPage - (cursor.page + maxPageNumberSiblings - totalPages.value))
		}

		// show maximum of maxVisiblePageNumbers
		if (endPage - startPage + 1 > maxVisiblePageNumbers) {
			if (cursor.page - startPage < endPage - cursor.page) {
				endPage = startPage + maxVisiblePageNumbers - 1
			} else {
				startPage = endPage - maxVisiblePageNumbers + 1
			}
		}

		const steps = []

		for (let i = startPage; i <= endPage; i++) {
			steps.push(i)
		}

		return steps
	})

	const prevPage = () => {
		emit('change', {
			page: cursor.page - 1,
			pageSize: cursor.pageSize,
		})
	}

	const nextPage = () => {
		emit('change', {
			page: cursor.page + 1,
			pageSize: cursor.pageSize,
		})
	}

	const goToPage = (pageNumber: number) => {
		if (pageNumber !== cursor.page) {
			emit('change', {
				page: pageNumber,
				pageSize: itemsPerPage.value,
			})
		}
	}
</script>

<style>
	.highlight {
		font-weight: bold;
		background: grey;
		color: white;
	}
</style>
