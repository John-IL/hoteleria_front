<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="6" md="6">
      <slot name="content-left">
        <b-row class="breadcrumbs-top">
          <b-col cols="12">
            <h3 class="content-header-title float-left pr-1 mb-0">
              {{ $t($route.meta.pageTitle)}}
            </h3>
            <div class="breadcrumb-wrapper">
              <b-breadcrumb>
                <b-breadcrumb-item to="/">
                  <feather-icon
                    icon="HomeIcon"
                    size="16"
                    class="align-text-top"
                  />
                </b-breadcrumb-item>
                <b-breadcrumb-item
                  v-for="item in $route.meta.breadcrumb"
                  :key="item.text"
                  :active="item.active"
                  :to="item.to"
                >
                  {{ $t(item.text) }}
                </b-breadcrumb-item>
              </b-breadcrumb>
            </div>
          </b-col>
        </b-row>
      </slot>
    </b-col>
    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="6"
      cols="6"
    >
      <slot name="content-right" />
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
};
</script>
