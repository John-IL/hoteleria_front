<template>
  <div>
    <header-slot>
      <template #content-right>
        <div class="mr-2">
          <b-button
            v-b-tooltip.bottom="'Registrar reserva'"
            variant="outline-success"
            @click="showReserveModal = true"
          >
            <feather-icon icon="PlusIcon" size="15" class="mr-1" />
            <span v-t="'CREATE'"></span>
          </b-button>
        </div>
      </template>
    </header-slot>

    <filter-slot
      :filter="filters"
      :filter-principal="filterPrincipal"
      :total-rows="totalRows"
      :paginate="paginate"
      @reload="refreshTable()"
    >
      <template #table>
        <b-table
          :per-page="paginate.perPage"
          ref="ref-table-reserve-list"
          :current-page="paginate.currentPage"
          sticky-header="50vh"
          class="position-relative"
          table-class="text-nowrap"
          :busy.sync="isBusy"
          :sort-desc.sync="sortDesc"
          :items="myProvider"
          :fields="fields"
          primary-key="id"
          :empty-text="$t('No matching records found')"
        >
          <template #table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle mr-1" />
              <strong v-t="'Loading...'"></strong>
            </div>
          </template>
          <template #cell(method_payment)="data">
            <div class="text-center">
              <span> {{ data.item.method_payment }} </span>
            </div>
          </template>
          <template #cell(total)="data">
            <div>
              S/ {{ data.item.total | currency }}
            </div>
          </template>
          <template #cell(reserve_date)="data">
            <div>
              {{ data.item.reserve_date | myGlobal }}
            </div>
          </template>
          <template #cell(actions)="data">
              <feather-icon
                icon="Edit2Icon"
                size="17"
                variant="warning"
                class="cursor-pointer text-warning ml-1"
                v-b-tooltip.left
                title="Ver Detalle"
            />
          </template>
        </b-table>
      </template>
    </filter-slot>
    <CreateReserveModal
      v-if="showReserveModal"
      @close="showReserveModal = false"
      @refreshTable="refreshTable"
    />
  </div>
</template>
  
  <script>
import Fields from "@/views/main/views/reserve/data/Fields.data.js";
import Filters from "@/views/main/views/reserve/data/Filters.data";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import CreateReserveModal from "@/views/main/views/reserve/components/ReserveModal.vue";
import ReserveService from "@/views/main/views/reserve/service/reserve.service.js"

export default {
  name: "ReserveGrid",
  components: {
    CreateReserveModal,
    FilterSlot,
  },
  data() {
    return {
      showReserveModal: false,
      startPage: 0,
      toPage: 0,
      isBusy: false,
      sortBy: "",
      sortDesc: true,
      totalRows: 0,
      filterPrincipal: {
        type: "input",
        inputType: "text",
        placeholder: "Search...",
        model: "",
      },
      paginate: {
        currentPage: 1,
        perPage: 10,
      },

      dataMeta: {
        from: 0,
        to: 0,
        of: 0,
      },
    };
  },
  methods: {
    async myProvider(ctx) {
      try {
        let params = {
          from: this.filters[0].model,
          to: this.filters[1].model,
          npage: ctx.currentPage,
          perpage: ctx.perPage,
          search_txt: this.filterPrincipal.model,
          orderby: ctx.sortBy,
          orderDesc: ctx.sortDesc ? "desc" : "asc",
          // order: null,
        };
        const { data } = await ReserveService.list(params);
        this.paginate.currentPage = data.current_page;
        this.paginate.perPage = data.per_page;
        this.paginate.to = data.to;
        this.paginate.of = data.total;
        this.paginate.from = data.from;

        return data.data || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    refreshTable() {
      this.$refs['ref-table-reserve-list'].refresh()
    },
  },

  computed: {
    fields() {
      return Fields.map((element) => ({
        ...element,
        label: this.$t(element.label),
      }));
    },

    filters() {
      return Filters.map((element) => ({
        ...element,
        label: this.$t(element.label),
      }));
    },

  },

};
</script>
    
    
    