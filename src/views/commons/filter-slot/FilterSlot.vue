<template>
  <b-card no-body class="mb-1 border-0 p-0">
    <!-- Siderbar for Filters Advance -->
    <sidebar-filters
      :filter="filter"
      @reload="sideBarSearch"
      @resetAllFilters="resetFiltersButtons"
    ></sidebar-filters>

    <div class="mx-2 mt-2">
      <b-row>
        <!-- Info Paginator -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">
            {{
              "Mostrando " +
              paginate.from +
              " a " +
              paginate.to +
              " de " +
              paginate.of +
              " resultados"
            }}
          </span>
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
    </div>

    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="8"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Mostrar</label>
          <v-select
            v-model="paginate.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="[10, 25, 50, 100]"
            :clearable="false"
            class="per-page-selector d-inline-block mx-50"
            @input="$emit('reload', false)"
          />
          <label class="mr-2">Registros</label>
          <feather-icon
            class="cursor-pointer"
            icon="RefreshCcwIcon"
            size="20"
            @click="resetFilter"
          />
          <div class="mr-1 ml-1 d-flex">
            <slot name="buttons" />
          </div>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="4">
          <div
            class="d-flex align-items-center justify-content-end align-items-center"
          >
            <slot name="buttons-filter" />
            <b-input-group v-if="!noVisiblePrincipalFilter" class="mr-1">
              <b-form-input
                v-if="filterPrincipal.type === 'input'"
                v-model="filterPrincipal.model"
                :type="filterPrincipal.inputType"
                :placeholder="filterPrincipal.placeholder"
                :class="filterPrincipal.class"
                @keyup.enter="$emit('reload')"
              />
              <b-input-group-append>
                <b-button variant="primary" @click="$emit('reload')">
                  <feather-icon icon="SearchIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>

            <b-button
              v-if="hasFilters"
              v-b-toggle.sidebar-right
              v-b-tooltip.bottom="'Filtros Avanzados'"
              variant="primary"
            >
              <div class="d-flex justify-content-between">
                <feather-icon icon="FilterIcon" size="15" />
              </div>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="table-responsive">
      <slot name="table" />
    </div>

    <div class="mx-2">
      <b-row>
        <b-col
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">
            {{
              "Mostrando " +
              paginate.from +
              " a " +
              paginate.to +
              " de " +
              paginate.of +
              " resultados"
            }}
          </span>
        </b-col>
        <!-- Pagination -->
        <slot name="footer" />
        <b-col
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <slot name="pagination">
            <!-- :total-rows=dataMeta.of -->
            <b-pagination
              v-model="paginate.currentPage"
              :total-rows="paginate.of"
              :per-page="paginate.perPage"
              first-number
              last-number
              class="mb-0 my-1 mt-sm-0"
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
    </div>
  </b-card>
</template>

<script>
import vSelect from "vue-select";
import SidebarFilters from "@/views/commons/filter-slot/SidebarFilters.vue";
import Ripple from "vue-ripple-directive";
import { VBToggle } from "bootstrap-vue";

export default {
  props: {
    /* 
    paginate:{
      from: 0,
      to: 0,
      of: 0,
      perPage:0,
      currentPage:9
    }
    */
    paginate: {
      type: Object,
      required: true,
    },
    noVisiblePrincipalFilter: {
      required: false,
      default: false,
    },
    filterPrincipal: {
      required: false,
      type: Object,
    },
    filter: { required: false, type: Array, default: [] },
  },
  components: {
    vSelect,
    SidebarFilters,
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },
  computed: {
    hasFilters() {
      return this.filter ? Object.keys(this.filter).length !== 0 : false;
    },
  },
  methods: {
    sideBarSearch() {
      // console.log("this.filter del sidbar", this.filter);
      // this.filterPrincipal.model = "";
      this.$emit("reload");
    },
    resetFiltersButtons() {
      if (this.filter) {
        this.filter.map((fil) => {
          fil.model = null;
        });
      }
      this.$emit("reset-all-filters");
    },
    resetFilter() {
      if (this.filter) {
        this.filter.map((fil) => {
          fil.model = null;
        });
      }
      this.filterPrincipal.model = "";
      this.$emit("reload");
    },
  },
  created() {
    if (this.filter) {
      this.filter.map((fil) => {
        fil.model = null;
      });
    }
    this.filterPrincipal.model = "";
  },
  data() {
    return {
      basicSearch: "",
    };
  },
};
</script>