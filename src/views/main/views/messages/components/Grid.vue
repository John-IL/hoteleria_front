<template>
  <div>
    <header-slot>
    </header-slot>
    <filter-slot :filter="filters" :filter-principal="filterPrincipal" :total-rows="totalRows" :paginate="paginate"
      @reload="$refs['ref-table-list-promotion'].refresh()">
      <template #table>
        <b-table :per-page="paginate.perPage" ref="ref-table-list-promotion" :current-page="paginate.currentPage"
          sticky-header="50vh" class="position-relative" table-class="text-nowrap" :busy.sync="isBusy"
          :sort-desc.sync="sortDesc" :items="myProvider" :fields="fields" primary-key="id"
          :empty-text="$t('No matching records found')">
          <template #table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle mr-1" />
              <strong v-t="'Loading...'"></strong>
            </div>
          </template>
          <template #cell(client)="data">
            <span> {{ data.item.first_name + " " + data.item.last_name }} </span>
          </template>
          <template #cell(created_at)="data">
            <div> {{ data.item.created_at | globalDate }} </div>
          </template>
          <template #cell(was_readed)="data">
            <b-badge variant="primary" v-if="data.item.was_readed">Si</b-badge>
            <b-badge variant="info" v-else>NO</b-badge>
          </template>
          <template #cell(actions)="data">
            <feather-icon @click="updateStatus(data.item.id)" v-if="!data.item.was_readed" size="17"
              class="cursor-pointer ml-1" icon="CheckIcon" v-b-tooltip.hover title="Marcar como leido"></feather-icon>
            <feather-icon size="17" class="cursor-pointer mx-1" icon="SearchIcon" variant="info" v-b-tooltip.hover
              title="Ver mensaje" @click="openModal(data.item.body)"></feather-icon>
          </template>
        </b-table>
      </template>
    </filter-slot>
    <b-modal v-model="showModal" @hidden="showModal = false" hide-footer>
      <div class="p-2 border rounded-sm">
        {{ textMessage }}
      </div>
    </b-modal>
  </div>
</template>
  
<script>
import Fields from "@/views/main/views/messages/data/fields.data.js";
import Filters from "@/views/main/views/messages/data/filters.data";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import MessageService from "@/views/main/views/messages/services/message.service.js";
import { mapActions } from "vuex"
export default {
  name: "PromotionGrid",
  components: {
    FilterSlot,
  },
  data() {
    return {
      startPage: 0,
      toPage: 0,
      isBusy: false,
      sortBy: "",
      sortDesc: true,
      fields: Fields,
      filters: Filters,
      totalRows: 0,
      textMessage: "",
      showModal: false,
      filterPrincipal: {
        type: "input",
        inputType: "text",
        placeholder: "Search...",
        model: "",
      },
      type: "promotion",
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
          status: this.filters[2].model
        };
        const { data } = await MessageService.List(params);
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

    async updateStatus(id) {
      try {
        this.addPreloader();
        const { data } = await MessageService.UpdateStatus({
          message: id
        });
        this.refreshTable()
        this.updateMessage();
      } catch (e) {
        console.log(e)
      } finally {
        this.removePreloader();
      }

    },

    refreshTable() {
      this.$refs["ref-table-list-promotion"].refresh();
    },

    openModal(body) {
      this.textMessage = body;
      this.showModal = true;
    },

    ...mapActions({
      updateMessage: "UserStore/A_GET_MESSAGES"
    })

  },
};
</script>
    
    
<style scoped>
.image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
}

.image-container {
  position: relative;
  top: 50px;
  max-width: 50%;
  max-height: 50%;
}


.close-button {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 99999;
}
</style>