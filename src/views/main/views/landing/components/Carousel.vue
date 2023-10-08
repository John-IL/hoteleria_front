<template>
  <div class="px-5 mt-5">
    <!-- title -->
    <div class="text-center">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">{{ description }}</p>
    </div>

    <div style="width: 100%; margin: 20px auto; height: 400px">
      <slider
        ref="slider"
        :options="options"
      >
      
        <slideritem
          v-for="(image, index) in images"
          :key="index"
          :style="{
            width: '100%',
            height: '100%',
            'background-image': `url(${image.image})`,
            'background-size': 'cover',
            'max-width': '300px',
            'margin-left': '10px',
            'margin-right': '10px',
            'background-position': 'center',
          }"
        ></slideritem>

        <div slot="loading">loading...</div>
      </slider>
    </div>
  </div>
</template>
    <script>
// import slider components
import { slider, slideritem } from "vue-concise-slider";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
  },
  data() {
    return {
      options: {
        currentPage: 0,
        tracking: false,
        thresholdDistance: 100,
        thresholdTime: 300,
        infinite: 4,
        slidesToScroll: 4,
        loop: true,
      },
    };
  },
  components: {
    slider,
    slideritem,
  },
};
</script>