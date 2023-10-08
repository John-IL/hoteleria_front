<template>
  <b-sidebar
    id="sidebar-right"
    right
    backdrop
    bg-variant="white"
    sidebar-class="sidebar-lg"
    header-class="pt-1"
    lazy
  >
    <template #header>
      <div class="d-flex justify-content-between align-items-center w-100">
        <span>
          <h3 v-t="'Advanced Search'"></h3>
        </span>
        <span v-b-toggle.sidebar-right class="cursor-pointer">
          <feather-icon icon="XIcon" size="20" />
        </span>
      </div>
    </template>
    <b-container>
      <b-row>
        <b-col v-for="(item, index) in filter" :key="index" :cols="item.cols">
          <b-form-group>
            <label :for="item.label">{{ $t(item.label) }}</label>
            <component
              :is="item.type"
              :label="item.label"
              v-model="item.model"
              :placeholder="item.placeholder"
              :required="item.required"
              :options="item.options"
              :validator="item.validator"
              :featured="item.featured"
              :inputType="item.inputType"
              :date-format-options="item.dateFormatOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    <template #footer>
      <b-container>
        <b-row class="d-flex p-1 float-right">
          <b-button variant="info" @click="resetFiltersButtons" v-t="'Reset'"></b-button>
          <b-button
            v-b-toggle.sidebar-right
            variant="primary"
            class="ml-1"
            @click="sideBarSearch"
            v-t="'Search'"></b-button
          >
        </b-row>
      </b-container>
    </template>
  </b-sidebar>
</template>

<script>
export default {
  props: {
    filter: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    resetFiltersButtons() {
      this.$emit("resetAllFilters");
    },
    sideBarSearch() {
      this.$emit("reload", this.filter);
    },
  },
};
</script>
