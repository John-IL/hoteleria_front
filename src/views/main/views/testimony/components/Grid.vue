<template>
  <div>
    <header-slot>
      <template #content-right>
        <div class="mr-2">
          <b-button
            v-b-tooltip.bottom="'Registrar testimonio'"
            variant="outline-success"
            @click="openModal({}, 'register')"
          >
            <feather-icon icon="PlusIcon" size="15" class="mr-1" />
            <span>Nuevo</span>
          </b-button>
        </div>
      </template>
    </header-slot>
    <filter-slot
      :filter="filters"
      :filter-principal="filterPrincipal"
      :total-rows="totalRows"
      :paginate="paginate"
      @reload="$refs['ref-table-testimonial-list'].refresh()"
    >
      <template #table>
        <b-table
          :per-page="paginate.perPage"
          ref="ref-table-testimonial-list"
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
          <template #cell(rooms)="data">
            <div>
              <b-badge class="mr-1"
                variant="primary"
                v-for="(room, index) in data.item.rooms"
                v-bind:key="index"
                >{{ room.number}}</b-badge
              >
            </div>
          </template>
          <template #cell(status)="data">
            <b-badge :variant="data.item.status == 1 ? 'success' : 'danger'">
              {{ data.item.status == 1 ? "Activo" : "Desactivado" }}
            </b-badge>
          </template>
          <template #cell(actions)="data">
            <feather-icon
              :icon="data.item.status == 1 ? 'ThumbsDownIcon' : 'ThumbsUpIcon'"
              size="17"
              :class="[
                'cursor-pointer',
                data.item.status == 1 ? 'text-danger' : 'text-success',
              ]"
              v-b-tooltip.left
              :title="data.item.status == 1 ? 'Desactivar' : 'Activar'"
              @click="changeStatusTestimony(data.item)"
            />
            <feather-icon
              icon="Edit2Icon"
              size="17"
              variant="warning"
              class="cursor-pointer text-warning ml-1"
              v-b-tooltip.left
              title="Actualizar promotione"
              @click="openModal(data.item, 'edit')"
            />
          </template>
        </b-table>
      </template>
    </filter-slot>

    <CreateTestimonyModal
      v-if="testimonyModal.status"
      @close="testimonyModal.status = false"
      :testimonyModal="testimonyModal"
      @refreshTable="$refs['ref-table-testimonial-list'].refresh()"
    />
  </div>
</template>
  
  <script>
import Fields from "@/views/main/views/testimony/data/Fields.data.js";
import Filters from "@/views/main/views/testimony/data/Filters.data";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import CreateTestimonyModal from "@/views/main/views/testimony/components/TestimonyModal.vue";
import TestimonialService from "@/views/main/views/testimony/services/testimonial.service.js";

export default {
  name: "TestimonyGrid",
  components: {
    FilterSlot,
    CreateTestimonyModal,
  },
  data() {
    return {
      fields: Fields,
      filters: Filters,
      startPage: 0,
      toPage: 0,
      isBusy: false,
      sortBy: "",
      sortDesc: true,
      testimonyModal: {
        type: "edit",
        status: false,
        data: {},
      },
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
          orderby: ctx.sortDesc ? "desc" : "asc",
          // order: null,
        };
        const { data } = await TestimonialService.list(params);
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
      this.$refs.ref - table - testimonial - list.refresh();
    },
    openModal(testimonial, type) {
      this.testimonyModal.type = type;
      this.testimonyModal.status = true;
      if (type == "register") {
      } else {
        this.roomModal.data = testimonial;
      }
    },
    async changeStatusTestimony(testimony) {
      testimony.status = testimony.status == 1 ? 0 : 1;
      const { data } = await TestimonialService.update(testimony);
    },
  },
};
</script>
    
    
    