<template>
  <q-table
    grid
    :data="items"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[5, 10, 20, 50]"
    :row-key="rowKey"
    rows-per-page-label="Elementos por página"
    hide-header
    class="bg-transparent no-shadow"
  >
    <template v-slot:item="props">
      <div class="col-12 q-mb-sm">
        <slot name="default" :user="props.row" :index="props.rowIndex"></slot>
      </div>
    </template>
    
    <template v-slot:no-data>
      <div class="full-width row flex-center q-pa-md text-grey-8">
        <slot name="no-data">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span class="q-ml-sm">No hay datos disponibles</span>
        </slot>
      </div>
    </template>
  </q-table>
</template>

<script>
export default {
  name: "PaginatedCardList",
  props: {
    items: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: "id"
    },
    initialRowsPerPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: this.initialRowsPerPage
      }
    };
  }
};
</script>
