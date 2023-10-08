<template>
  <div>
    <div class="image-overlay" v-if="statusShowBanner">
      <div class="image-container">
        <b-button @click="statusShowBanner = false" class="close-button" variant="primary">
          <feather-icon icon="XIcon"></feather-icon>
        </b-button>
        <b-img
          :src="showBannerSrc"
          alt="Image 1"
          class="full-image mt-2"
          fluid
        ></b-img>
      </div>
    </div>
    <header-slot>
      <template #content-right>
        <div class="mr-2">
          <b-button
            v-b-tooltip.bottom="'Registrar banner'"
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
      @reload="$refs['ref-table-banner-list'].refresh()"
    >
      <template #table>
        <b-table
          :per-page="paginate.perPage"
          ref="ref-table-banner-list"
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
          <template #cell(image)="data">
            <div
              class="d-flex flex-column justify-content-center align-items-start clickable cursor-pointer"
              v-b-tooltip.hover.left="'Click para ver el baner'"
              @click="showBanner(data.item.image)"
            >
              <b-avatar :src="data.item.image" square></b-avatar>
            </div>
          </template>
          <template #cell(name)="data">
            <span> {{ $t(data.item.name) | capitalize }} </span> <br />
          </template>

          <template #cell(created_at)="data">
            <span> {{ data.item.created_at | globalDate }} </span> <br />
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
              :icon="data.item.status ? 'ThumbsDownIcon' : 'ThumbsUpIcon'"
              size="17"
              :class="[
                'cursor-pointer',
                data.item.status ? 'text-danger' : 'text-success',
              ]"
              v-b-tooltip.left
              :title="data.item.status ? 'Desactivar' : 'Activar'"
              @click="changeStatusBanner(data.item)"
            />
            <!-- <feather-icon
              icon="Edit2Icon"
              size="17"
              variant="warning"
              class="cursor-pointer text-warning ml-1"
              v-b-tooltip.left
              title="Actualizar Banner"
              @click="openModal(data.item, 'edit')"
            /> -->
          </template>
        </b-table>
      </template>
    </filter-slot>

    <CreateBannerModal
      v-if="bannerModal.status"
      :bannerModal="bannerModal"
      @refreshTable="$refs['ref-table-banner-list'].refresh()"
      @close="bannerModal.status = false"
    />
  </div>
</template>
  
  <script>
import Fields from "@/views/main/views/banner/data/Fields.data.js";
import Filters from "@/views/main/views/banner/data/Filters.data";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import CreateBannerModal from "@/views/main/views/banner/components/BannerModal.vue";
import BannerService from "@/views/main/views/banner/services/banner.service.js";

export default {
  name: "BannerGrid",
  components: {
    FilterSlot,
    CreateBannerModal,
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
      bannerModal: {
        status: false,
      },
      statusShowBanner: false,
      showBannerSrc: "",
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
    openModal(banner, type) {
      this.bannerModal.type = type;
      this.bannerModal.status = true;
      if (type == "register") {
      } else {
        this.bannerModal.data = banner;
      }
    },

    showBanner(src) {
      this.statusShowBanner = true;
      this.showBannerSrc = src;
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
          status: this.filters[2].model,
          // order: null,
        };
        const { data } = await BannerService.list(params);
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
      this.$refs.ref - table - banner - list.refresh();
    },
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