<template>
  <div>
    <div class="image-overlay" v-if="statusShowBanner">
      <div class="image-container">
        <b-button
          @click="statusShowBanner = false"
          class="close-button"
          variant="primary"
        >
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
            v-b-tooltip.bottom="'Registrar promoción'"
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
      @reload="$refs['ref-table-list-promotion'].refresh()"
    >
      <template #table>
        <b-table
          :per-page="paginate.perPage"
          ref="ref-table-list-promotion"
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
            <span> {{ data.item.first_name + " " + data.item.last_name }} </span
            ><br />
          </template>
          <template #cell(email)="data">
            <span> {{ data.item.email }} </span>
          </template>
          <template #cell(image)="data">
            <div
              class="d-flex flex-column justify-content-center align-items-start clickable cursor-pointer"
              v-b-tooltip.hover.left="'Click para ver la promocion'"
              @click="showBanner(data.item.image)"
            >
              <b-avatar :src="data.item.image" square></b-avatar>
            </div>
          </template>
          <template #cell(cost)="data">
            <div>
              S/ {{ data.item.cost | currency }}
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
              @click="changeStatusPromotion(data.item)"
            />
            <feather-icon
              icon="Edit2Icon"
              size="17"
              variant="warning"
              class="cursor-pointer text-warning ml-1"
              v-b-tooltip.left
              title="Actualizar promocion"
              @click="openModal(data.item, 'edit')"
            />
          </template>
        </b-table>
      </template>
    </filter-slot>
    <CreatePromotionModal
      v-if="promotionModal.status"
      @close="promotionModal.status = false"
      :promotionModal="promotionModal"
      @refreshTable="$refs['ref-table-list-promotion'].refresh()"
    />
  </div>
</template>
  
  <script>
import Fields from "@/views/main/views/promotions/data/fields.data.js";
import Filters from "@/views/main/views/promotions/data/filters.data";
import FilterSlot from "@/views/commons/filter-slot/FilterSlot.vue";
import CreatePromotionModal from "@/views/main/views/promotions/components/PromotionModal.vue";
import PromotionService from "@/views/main/views/promotions/services/promotion.service.js";
export default {
  name: "PromotionGrid",
  components: {
    FilterSlot,
    CreatePromotionModal,
  },
  data() {
    return {
      promotionModal: {
        status: false,
        type: "",
        data: {},
      },
      startPage: 0,
      toPage: 0,
      isBusy: false,
      statusShowBanner: false,
      showBannerSrc: "",
      sortBy: "",
      sortDesc: true,
      totalRows: 0,
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
    openModal(promotion, type) {
      this.promotionModal.type = type;
      this.promotionModal.status = true;
      if (type == "register") {
        this.promotionModal.data = {};
      } else {
        this.promotionModal.data = promotion;
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
        const { data } = await PromotionService.list(params);
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
    showBanner(src) {
      this.statusShowBanner = true;
      this.showBannerSrc = src;
    },
    refreshTable() {
      this.$refs["ref-table-list-promotion"].refresh();
    },

    async changeStatusPromotion(promotion) {
      promotion.status = promotion.status == 1 ? 2 : 1;
      const { data } = await PromotionService.update(promotion);
    },

    openModal(promotion, type) {
      this.promotionModal.type = type;
      this.promotionModal.status = true;
      if (type == "register") {
        this.promotionModal.data = {};
      } else {
        this.promotionModal.data = promotion;
      }
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