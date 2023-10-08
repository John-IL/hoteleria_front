<template>
  <div>
    <b-table
      v-if="!isBusy"
      ref="ref-table-check-processing"
      :current-page="paginate.currentPage"
      :per-page="paginate.perPage"
      primary-key="id"
      show-empty
      empty-text="No matching records found"
      class="font-small-3"
      :dataMeta="dataMeta"
      :paginate="paginate"
      :filter="filters"
      :filterPrincipal="filterPrincipal"
      @reload="$refs['ref-table-check-processing'].refresh()"
      :busy.sync="isBusy"
      small
      sticky-header
      :items="items"
      :fields="fields"
      responsive
      striped
    >
    </b-table>
    <TableSkeleton v-else :columns="fields.length"></TableSkeleton>
  </div>
</template>
<script>
import TableSkeleton from "@/views/commons/skeletons/TableSkeleton.vue";
export default {
  name: "DiegoTable",
  components: {
    TableSkeleton,
  },
  props: {
    isBusy: {
      type: Boolean,
      default: false,
    },
    dataMeta: {
      type: Object,
      default: () => ({}),
    },
    paginate: {
      type: Object,
      default: () => ({}),
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    filterPrincipal: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
};
</script>