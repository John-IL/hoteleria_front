<template>
  <b-container fluid class="m-0 p-0 bg-dark">
    <!-- footer -->
    <b-row class="footer m-0 p-0" no-gutters>
      <b-col cols="12">
        <b-card
          title="Contacto"
          class="mb-2"
          bg-variant="dark "
          text-variant="white"
          title-variant="white"
          title-tag="h1"
        >
          <b-card-text>
            <b-icon icon="envelope-fill" class="mr-2"></b-icon>
            <a href="mailto: " class="text-white">{{ email }}</a>
          </b-card-text>
          <b-card-text>
            <b-icon icon="telephone-fill" class="mr-2"></b-icon>
            <a href="tel: " class="text-white">{{ phone }}</a>
          </b-card-text>
          <b-card-text>
            <b-icon icon="geo-alt-fill" class="mr-2"></b-icon>
            <a :href="googleMapsLink" class="text-white">{{ address }} </a>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: process.env.VUE_APP_LANDING_EMAIL,
      phone: process.env.VUE_APP_LANDING_PHONE,
      address: process.env.VUE_APP_LANDING_ADDRESS,
      googleMapsLink: process.env.VUE_APP_GOOGLE_MAPS_LINK,
    };
  },
};
</script>

<style>
.bg-dark {
  background-color: #343a40 !important;
}
</style>