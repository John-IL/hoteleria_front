<template>
  <b-card :title="'Ubícanos en' + ' ' + address">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />

      <!-- Use default icon -->
      <l-marker :lat-lng="[-12.05341, -76.96397]" />

      <!-- Use icon given in icon property -->
      <!-- <l-marker :lat-lng="[-12.05247, -76.96236]" :icon="icon" /> -->

      <!-- Create image icon (icon) from l-icon tag -->
      <!-- <l-marker :lat-lng="[-12.05247, -76.96236]">
        <l-icon>
          <b-img
            :src="require('@/assets/images/misc/leaf-red.png')"
            height="50"
          />
        </l-icon>
      </l-marker> -->
    </l-map>

    <!-- <template #code>
      {{ codeCustomIcon }}
    </template> -->
  </b-card>
</template>

<script>
/* eslint-disable global-require */
import { BImg } from "bootstrap-vue";
import BCardCode from "@/@core/components/b-card-code/BCardCode.vue";
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { latLng, icon, Icon } from "leaflet";
import { codeCustomIcon } from "./code";

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "Icon",
  components: {
    BImg,
    BCardCode,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  data() {
    return {
      address: process.env.VUE_APP_LANDING_ADDRESS,
      zoom: 19,
      center: latLng(-12.05341, -76.96397),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: icon({
        iconUrl: require("@/assets/images/misc/leaf-green.png"),
        iconSize: [50, 50],
        iconAnchor: [16, 37],
      }),
      codeCustomIcon,
    };
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
.vue2leaflet-map {
  &.leaflet-container {
    height: 350px;
  }
}
</style>
