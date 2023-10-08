<template>
  <div>
    <b-row class="d-flex align-items-center px-1 mt-2">
      <b-col cols="12">
        <slot name="buttons"></slot>
      </b-col>
      <b-col cols="12">
        <slot name="paginator">
          <b-row>
            <!-- Info Paginator -->
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <span
                class="text-muted"
                v-t="{
                  path: 'ShowingAll',
                  locate: $i18n.locale,
                  args: {
                    from: paginate.from,
                    to: paginate.to,
                    of: paginate.of,
                  },
                }"
              ></span>
            </b-col>

            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
              <slot name="top-buttons" />
              <slot name="pagination">
                <b-pagination
                  v-model="paginate.currentPage"
                  :total-rows="paginate.of"
                  :per-page="paginate.perPage"
                  first-number
                  last-number
                  class="mb-0 mt-1 mt-sm-0"
                  prev-class="prev-item"
                  next-class="next-item"
                  @input="$emit('onChangeCurrentPage', $event)"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </slot>
            </b-col>
          </b-row>
        </slot>
      </b-col>
      <b-col cols="12">
        <b-table-simple>
          <b-thead>
            <b-tr>
              <b-th v-for="header in headers" :key="header.name" scope="col">
                <b>{{ header.name }}</b>
              </b-th>

              <b-th v-for="day in days" :key="day.prefix" scope="col">
                <b>{{ day.prefix }} {{ day.date }}</b>
              </b-th>
            </b-tr>
          </b-thead>

          <tbody style="font-size: 5rem !important" v-if="data.length > 0">
            <slot name="tbody"></slot>
          </tbody>

          <tbody v-else>
            <slot name="no-data">
              <b-tr>
                <b-td colspan="8" class="text-center">
                  <img
                    class="my-5"
                    :src="require('@/assets/images/tables/empty_data.png')"
                    alt="empty"
                    border="0"
                    width="200"
                  />
                  <h5 class="text-muted mb-5">No data available</h5>
                </b-td>
              </b-tr>
            </slot>
          </tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    days: {
      type: Array,
      default: () => [
        {
          prefix: "Mon",
          date: moment().format("YYYY-MM-DD"),
        },
        {
          prefix: "Tue",
          date: moment().format("YYYY-MM-DD"),
        },
        {
          prefix: "Wed",
          date: moment().format("YYYY-MM-DD"),
        },
        {
          prefix: "Thu",
          date: moment().format("YYYY-MM-DD"),
        },
        {
          prefix: "Fri",
          date: moment().format("YYYY-MM-DD"),
        },
        {
          prefix: "Sat",
          date: moment().format("YYYY-MM-DD"),
        },
        {
          prefix: "Sun",
          date: moment().format("YYYY-MM-DD"),
        },
      ],
    },
    headers: {
      type: Array,
      default: () => [
        {
          name: "User",
        },
      ],
    },
    paginate: {
      type: Object,
      default: () => ({
        currentPage: 1,
        perPage: 10,
        of: 0,
        from: 0,
        to: 0,
      }),
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      currentPage: 1,
      total: 0,
      perPage: 10,
    };
  },
  created() {},
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.$emit("changePage", page);
    },
  },
  beforeDestroy() {},
  watch: {},
  computed: {},
};
</script>
<style scoped>
</style>