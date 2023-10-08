<template>
  <div>
    <b-modal
      v-model="modalShow"
      id="modal-lg"
      size="lg"
      :title="dataModal.title"
      no-close-on-backdrop
      @hidden="closeModal"
      @close="closeModal"
      hide-footer
    >
      <card-chart :dataModal="dataModal"/>
    </b-modal>
  </div>
</template>

<script>
import CardChart from "@/views/main/views/report/components/CardChart.vue";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
export default {
  components: {
    CardChart,
  },

  props:{
    dataModal:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modalShow: true,
    };
  },

  methods:{
    closeModal(){
      this.$emit('close')
    }
  }
};
</script>