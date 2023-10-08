<template>
  <div>
    <header-slot>
      <template #content-right>
        <div class="mr-2">
          <b-button
            v-b-tooltip.bottom="'Registrar habitación'"
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
      @reload="$refs['reft-table-list-room'].refresh()"
    >
      <template #table>
        <b-table
          :filter="filters"
          :per-page="paginate.perPage"
          ref="reft-table-list-room"
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

          <template #cell(guest_number)="data">
            <div >
              <span> {{ data.item.guest_number }} </span>
            </div>
          </template>
          <template #cell(cost)="data">
            <div>
              <span> S/ {{ data.item.cost | currency }} </span>
            </div>
          </template>
          <template #cell(status)="data">
            <b-badge
              pill
              :variant="data.item.status ? 'light-success' : 'light-warning'"
              class="text-capitalize"
            >
              <span>
                {{
                  data.item.status ? $t("Active") : $t("Inactive") | capitalize
                }}</span
              >
            </b-badge>
          </template>
          <template #cell(actions)="data">
            <feather-icon
              :icon="data.item.status ? 'ThumbsDownIcon': 'ThumbsUpIcon'"
              size="17"
              :class="['cursor-pointer', data.item.status ? 'text-danger': 'text-success']"
              v-b-tooltip.left
              :title="data.item.status ? 'Desactivar': 'Activar'"
              @click="changeStatusRoom(data.item)"
            />
              <feather-icon
                icon="Edit2Icon"
                size="17"
                variant="warning"
                class="cursor-pointer text-warning ml-1"
                v-b-tooltip.left
                title="Actualizar Usuario"
                @click="openModal(data.item, 'edit')"
            />
          </template>
        </b-table>
      </template>
    </filter-slot>

    <CreateRoomModal
      v-if="roomModal.status"
      @close="roomModal.status = false"
      :roomModal="roomModal"
      @refreshTable="$refs['reft-table-list-room'].refresh()"
    />
  </div>
</template>
  
<script>
import CreateRoomModal from "@/views/main/views/room/components/RoomModal.vue";
import Fields from "@/views/main/views/room/data/Fields.data.js";
import Filters from "@/views/main/views/room/data/Filters.data.js";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import RoomServices from "@/views/main/views/room/services/room.service.js";

export default {
  name: "RoomGrid",
  components: {
    FilterSlot,
    CreateRoomModal,
  },
  data() {
    return {
      filters: Filters,
      roomModal: {
        status: false,
        type: "",
        data: {},
      },
      showRoomModal: false,
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
    openModal(room, type) {
      this.roomModal.type = type;
      this.roomModal.status = true;
      if (type == "register") {
        this.roomModal.data = {
          country: 1,
          document_type: 1,
        };
      } else {
        this.roomModal.data = room;
      }
    },
    async myProvider(ctx) {
      try {
        console.log(ctx);
        let params = {
          from: this.filters[0].model,
          to: this.filters[1].model,
          npage: ctx.currentPage,
          perpage: ctx.perPage,
          search_txt: this.filterPrincipal.model,
          orderby: ctx.sortDesc ? "desc" : "asc",
          // order: null,
        };
        const { data } = await RoomServices.list(params);
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
      this.$refs.reft-table-list-room.refresh();
    },

    async changeStatusRoom(room){
      room.status = room.status ? 0 : 1
      const {data} = await RoomServices.update(room);
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
    
    
    