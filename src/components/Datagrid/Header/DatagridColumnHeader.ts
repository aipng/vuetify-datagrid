import type { DataTableHeader } from 'vuetify/framework'

export type DatagridColumnHeader = Omit<DataTableHeader, 'key' | 'value' | 'children'> & {
	key: string
	title: string
	align?: 'start' | 'center' | 'end'
	sortable?: boolean
	type?: 'text' | 'number' | 'boolean' | 'date' | 'url' | 'array' | 'email'
	value?: (item: unknown) => string | null
}
