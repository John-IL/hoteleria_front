<template>
  <div class="card">
    <b-row class="d-flex mx-2">
      <b-col cols="12" class="mt-2 d-flex justify-content-end">
        <p class="d-inline mr-1">Bar</p>
        <b-form-checkbox
          switch
          class="d-inline"
          v-model="chartType"
        ></b-form-checkbox>
        <p class="pl-1">Pie</p>
      </b-col>
    </b-row>

    <div>
      <CustomPieChart
        :title="reportType.text"
        :data="dataModal.data"
        :colors="colorsChart"
        v-if="chartType"
      />
      <CustomPBarChart :title="reportType.text" :data="dataModal.data" v-else />
    </div>
  </div>
</template>

<script>
import CustomPieChart from "@/views/main/views/report/components/charts/CustomPieChart.vue";
import CustomPBarChart from "@/views/main/views/report/components/charts/CustomBarChart.vue";

export default {
  components: {
    CustomPieChart,
    CustomPBarChart,
  },
  props: {
    dataModal: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      chartType: false,
      optionsReport: [{ value: 1, text: "Reservas Mensuales" }],
      reportType: { value: 1, text: "Reservas Mensuales" },
      dataChart: [
        { value: 1, name: "Enero" },
        { value: 16, name: "Febrero" },
        { value: 12, name: "Marzo" },
      ],
      colorsChart: ["#82868b", "#3390e7", "#f89f43", "#00D25B", "#82868b"],
    };
  },

  methods: {
  },
};
</script>