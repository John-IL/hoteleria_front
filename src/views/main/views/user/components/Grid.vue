<template>
  <div>
    <header-slot>
      <template #content-right>
        <div class="mr-2">
          <b-button
            v-b-tooltip.bottom="'Registrar nuevo usuario'"
            variant="outline-success"
            @click="openModal({}, 'register')"
          >
            <feather-icon icon="PlusIcon" size="15" class="mr-1" />
            <span>NUEVO</span>
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
          ref="ref-table-users-list"
          :current-page="paginate.currentPage"
          sticky-header="50vh"
          class="position-relative"
          table-class="text-nowrap"
          :busy.sync="isBusy"
          :sort-desc.sync="sortDesc"
          :items="myProvider"
          :fields="fields"
          primary-key="id"
          empty-text="No se encontraron registros coincidentes"
        >
          <template #table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle mr-1" />
              <strong>Loading...</strong>
            </div>
          </template>
          <template #cell(full_name)="data">
            <span>
              {{
                (data.item.first_name + " " + data.item.last_name) | capitalize
              }} </span
            ><br />
          </template>
          <template #cell(email)="data">
            <span> {{ data.item.email }} </span>
          </template>
          <template #cell(role)="data">
            <span> {{ data.item.role_name | capitalize }} </span> <br />
          </template>

          <template #cell(is_active)="data">
            <b-badge :variant="data.item.is_active ? 'success' : 'danger'">
              {{ data.item.is_active ? "Activo" : "Desactivado" }}
            </b-badge>
          </template>
          <template #cell(actions)="data">
            <feather-icon
              :icon="data.item.is_active ? 'ThumbsDownIcon' : 'ThumbsUpIcon'"
              size="17"
              :class="[
                'cursor-pointer',
                data.item.is_active ? 'text-danger' : 'text-success',
              ]"
              v-b-tooltip.left
              :title="data.item.is_active ? 'Desactivar' : 'Activar'"
              @click="changeStatusUser(data.item)"
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

    <UserModal
      v-if="userModal.status"
      @close="userModal.status = false"
      @refreshTable="refreshTable"
      :userModal="userModal"
    />
  </div>
</template>
  
  <script>
/* DATA */
import Fields from "@/views/main/views/user/data/Fields.data";
import Filters from "@/views/main/views/user/data/Filters.data";

/* COMPONENTS */
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import UserServices from "@/views/main/views/user/services/users.service";
import UserModal from "@/views/main/views/user/components/UserModal.vue";

export default {
  name: "UserList",
  components: {
    FilterSlot,
    UserModal,
  },
  data() {
    return {
      userModal: {
        status: false,
        type: "edit",
        data: [],
      },
      fields: Fields,
      filters: Filters,
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
        from: 0,
        to: 0,
        of: 0,
      },

      dataMeta: {
        from: 0,
        to: 0,
        of: 0,
      },
    };
  },
  mounted() {
    this.getRoles();
    this.getCountries();
  },
  methods: {
    async getRoles() {
      try {
        const { data } = await UserServices.getRoles();
        data.forEach((item) => {
          item.value = item.id;
          item.text = item.name;
        });
        this.filters[2].options = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCountries() {
      try {
        const { data } = await UserServices.getCountries();
        data.forEach((item) => {
          item.value = item.id;
          item.text = item.name;
        });
        this.filters[3].options = data;
      } catch (error) {
        console.log(error);
      }
    },
    async myProvider(ctx) {
      try {
        let params = {
          date_from: this.filters[0].model,
          date_to: this.filters[1].model,
          role_id: this.filters[2].model,
          country_id: this.filters[3].model,
          status: this.filters[4].model,
          npage: ctx.currentPage,
          perpage: ctx.perPage,
          search_txt: this.filterPrincipal.model,
          orderby: ctx.sortDesc ? "desc" : "asc",
          // order: null,
        };
        const { data } = await UserServices.getUsers(params);
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

    async changeStatusUser(user) {
      user.is_active = user.is_active ? 0 : 1;
      const { data } = await UserServices.update(user);
    },

    refreshTable() {
      this.$refs["ref-table-users-list"].refresh();
    },

    openModal(user, type) {
      this.userModal.type = type;
      this.userModal.status = true;
      if (type == "register") {
        this.userModal.data = {
          country: 1,
          document_type: 1,
          role: 2,
          personal_type: 5,
        };
      } else {
        this.userModal.data = user;
      }
    },
  },
};
</script>
    
    
    