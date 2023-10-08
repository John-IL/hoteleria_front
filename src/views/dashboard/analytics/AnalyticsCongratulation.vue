<template>
  <b-card
    v-if="data"
    text-variant="center"
    class="card"
    :class="
      time >= 6 && time <= 18
        ? 'day-background-image'
        : 'night-background-image'
    "
    style="min-height: 220px"
  >
    <b-card-text
      class="text-white d-flex align-items-end justify-content-end"
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
      "
    >
      <h1 class="text-white mr-2 mb-2">
        Bienvenido, {{ currentUser.fullName | capitalize }}
      </h1>
    </b-card-text>
  </b-card>
</template>

<script>
import { BCard, BImg, BAvatar, BCardText } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      time: new Date().getHours(),
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
  },
  created() {
    setInterval(() => {
      this.time = new Date().getHours();
    }, 1000);
  },
  methods: {},
};
</script>

<style scoped>
.night-background-image {
  background-image: url("~@/assets/images/elements/night.jpg");
}
.day-background-image {
  background-image: url("~@/assets/images/elements/day.jpeg");
}
</style>
