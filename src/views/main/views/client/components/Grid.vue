<template>
  <div>
    <header-slot>
      <template #content-right>
        <div class="mr-2">
          <b-button
            v-b-tooltip.bottom="'Registrar cliente'"
            variant="outline-success"
            @click="openModal({}, 'register')"
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
      @reload="$refs['ref-table-client-list'].refresh()"
    >
      <template #table>
        <b-table
          :per-page="paginate.perPage"
          ref="ref-table-client-list"
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
          <template #cell(full_name)="data">
            <span> {{ data.item.first_name + " " + data.item.last_name | capitalize}} </span
            ><br />
          </template>
          <template #cell(email)="data">
            <span> {{ data.item.email }} </span>
          </template>
          <template #cell(country_name)="data">
            <span> {{ data.item.country_name }} </span>
          </template>
          <template #cell(document_type_name)="data">
            <div class="text-center">
              <span> {{ data.item.document_type_name }} </span>
            </div>
          </template>
          <template #cell(actions)="data">
            <feather-icon
              :icon="data.item.status ? 'ThumbsDownIcon' : 'ThumbsUpIcon'"
              size="17"
              :class="[
                'cursor-pointer',
                data.item.status ? 'text-danger' : 'text-success',
              ]"
              v-b-tooltip.left
              :title="data.item.status ? 'Desactivar' : 'Activar'"
              @click="changeStatusclient(data.item)"
            />
            <feather-icon
              icon="Edit2Icon"
              size="17"
              variant="warning"
              class="cursor-pointer text-warning ml-1"
              v-b-tooltip.left
              title="Actualizar Cliente"
              @click="openModal(data.item, 'edit')"
            />
          </template>
        </b-table>
      </template>
    </filter-slot>
    <CreateClientModal
      v-if="clientModal.status"
      @close="clientModal.status = false"
      :clientModal="clientModal"
      @refreshTable="refreshTable"
    />
  </div>
</template>
  
  <script>
import Fields from "@/views/main/views/client/data/Fields.data.js";
import Filters from "@/views/main/views/client/data/Filters.data";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import CreateClientModal from "@/views/main/views/client/components/ClientModal.vue";
import ClientService from "@/views/main/views/client/services/client.service.js";
export default {
  name: "ClientGrid",
  components: {
    FilterSlot,
    CreateClientModal,
  },
  data() {
    return {
      clientModal: {
        status: false,
        type: "",
        data: {},
      },
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
      type: "client",
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
    openModal(client, type) {
      this.clientModal.type = type;
      this.clientModal.status = true;
      if (type == "register") {
        this.clientModal.data = {
          country: 1,
          document_type: 1,
        };
      } else {
        this.clientModal.data = client;
      }
    },
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
        const { data } = await ClientService.list(params);
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
      this.$refs["ref-table-client-list"].refresh();
    },

    async changeStatusclient(client){
      client.status = client.status ? 0 : 1
      const {data} = await ClientService.update(client);
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
    
    
    