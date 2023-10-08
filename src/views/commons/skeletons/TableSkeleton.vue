<template>
  <div>
    <b-skeleton-table
      :rows="rows"
      :columns="restricQuantity"
      :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
  </div>
</template>
<script>
export default {
  name: "TableSkeleton",
  props: {
    rows: {
      type: Number,
      default: 5,
    },
    columns: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      skeletonRows: [],
    };
  },
  computed: {
    restricQuantity() {
      return this.columns > 10 ? 10 : this.columns;
    },

    // isBusy() {
    //   return this.$store.state.appConfig.isBusy;
    // },
    // fields() {
    //   return this.$store.state.appConfig.fields;
    // },
  },
  methods: {
    calcWidth() {
      return "100px";
    },
    // generateSkeletonRows() {
    //   for (let i = 0; i < this.rows; i++) {
    //     this.skeletonRows.push(i);
    //   }
    // },
  },
  mounted() {
    // this.generateSkeletonRows();
  },
};
</script>