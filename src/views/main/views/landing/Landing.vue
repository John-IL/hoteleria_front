<template>
  <div>
    <Navbar />

    <section id="rooms">
      <Carousel
        :title="rooms.title"
        :description="rooms.description"
        :images="roomsImages"
      />
    </section>

    <Divider />
    <!-- <section id="promotions">
      <Carousel
        :title="promotions.title"
        :description="promotions.description"
        :images="images"
      />
    </section> -->

    <section id="contactus">
      <ContactForm />
    </section>

    <section id="map">
      <Map />
    </section>
    <Footer />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/views/main/views/landing/components/Navbar.vue";
import Carousel from "@/views/main/views/landing/components/Carousel.vue";
import Divider from "@/views/main/views/landing/components/Divider.vue";
import Map from "@/views/charts-and-maps/maps/leaflet/Leaflet.vue";
import Footer from "@/views/main/views/landing/components/Footer.vue";
import ContactForm from "@/views/main/views/messages/components/ContactForm.vue";
import BannerService from "@/views/main/views/banner/services/banner.service.js"
export default {
  name: "Landing",
  components: {
    Navbar,
    Carousel,
    Divider,
    Map,
    Footer,
    ContactForm,
  },
  data() {
    return {
      roomsImages: [],
      rooms: {
        title: "Habitaciones",
        description: "El mejor hospedaje para pasar un buen rato con tu pareja",
      },
      promotions: {
        title: "Promociones",
        description: "Las mejores promociones para que te quedes con nosotros",
      },
      images: [
        {
          url: "@/assets/images/habitacionesfotos/1.jpeg",
        },
        {
          url: "@/assets/images/habitacionesfotos/2.jpeg",
        },
        {
          url: "@/assets/images/habitacionesfotos/3.jpeg",
        },
        {
          url: "/@/assets/images/habitacionesfotos/4.jpeg",
        },
      ],
    };
  },

  methods: {
    async getLastBanners(){
      const {data} = await BannerService.Last10();
      this.roomsImages = data;
    }
  },

  async created(){
    await this.getLastBanners();
  }

};
</script>
<style >
/* Add the following styles to your CSS file */

.animate {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
}

.animate-show {
  opacity: 1;
  transform: translateY(0);
}

/* global smoth scroll  */
html {
  scroll-behavior: smooth;
}
</style>