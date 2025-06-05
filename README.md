# aipng/datagrid

Opiniated and extended version of Vuetify's datagrid component for Vue 3.

Provides sorting, pagination, row selection and row expansion.

This component builds upon Vuetify's foundation while adding more functionality and customization options.

## Installation

```bash
npm install aipng/datagrid
```

# Datagrid

## Usage

```vue
<template>
  <TheDatagrid
    :headers="headers"
    :result="result"
    v-model:sort-by="sortBy"
    :cursor="cursor"
    @onCursorChange="handleCursorChange"
    @onSortChange="handleSortChange"
  >
    <!-- Optional slots for custom column rendering -->
    <template #col-name="{ item }">
      {{ item.name }}
    </template>
  </TheDatagrid>
</template>

<script setup lang="ts">
import { TheDatagrid } from 'aipng/datagrid'
import type { DatagridColumnHeader, CursorPosition, SortItem } from 'aipng/datagrid'

const headers: DatagridColumnHeader[] = [
  {
    key: 'id',
    title: '#',
    align: 'center',
    sortable: false,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
]

const result = {
  itemsTotal: 100,
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ],
}

const cursor: CursorPosition = {
  page: 1,
  pageSize: 10,
}

const sortBy: SortItem = {
  sort: 'id',
  order: 'desc',
}

const handleCursorChange = (newCursor: CursorPosition) => {
  // Handle page change
}

const handleSortChange = (newSort: SortItem) => {
  // Handle sort change
}
</script>
```

## Props

| Prop | Type | Required | Default | Description |
|------|-----|---------|-----------------|-------|
| headers | DatagridColumnHeader[] | Yes | - | Column configuration |
| result | { itemsTotal: number, items: T[] } | Yes | - | Data to display |
| showSelect | boolean | No | false | Show checkbox for row selection |
| showExpand | boolean | No | false | Show button for row expansion |

## Events

| Event | Parameters | Description |
|-------|-----------|-------|
| onCursorChange | CursorPosition | Page or page size change |
| onSortChange | SortItem | Sort change |

## Slots

| Slot | Parameters | Description |
|------|-----------|-------|
| col-{key} | { item: T } | Custom column rendering |
| itemExpandButton | { item: T, isExpanded: boolean, toggleExpand: () => void } | Custom expand button |
| expandedRow | { item: T } | Custom expanded row content |

# Pagination

The datagrid includes a built-in pagination component that appears when the total number of items exceeds 5. The pagination component is displayed both at the top and bottom of the table for better user experience.

The pagination component accepts the following props:

| Prop | Type | Required | Description |
|------|-----|---------|-------|
| cursor | CursorPosition | Yes | Current page and page size |
| itemsTotal | number | Yes | Total number of items |

And emits the following events:

| Event | Parameters | Description |
|-------|-----------|-------|
| change | CursorPosition | Emitted when page or page size changes |

## Types

### DatagridColumnHeader

```typescript
type DatagridColumnHeader = {
  key: string
  title: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  type?: 'text' | 'number' | 'boolean' | 'date' | 'url' | 'array' | 'email'
  value?: (item: unknown) => string | null
}
```

### CursorPosition

```typescript
type CursorPosition = {
  page: number
  pageSize: number
}
```

### SortItem

```typescript
type SortItem = {
  sort: string
  order: 'asc' | 'desc'
}
```
