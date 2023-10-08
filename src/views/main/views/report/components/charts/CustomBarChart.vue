<template>
  <b-card>
    <e-charts ref="line" :options="option" theme="theme-color" autoresize />
  </b-card>
</template>
  
  <script>
import ECharts from "vue-echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
  components: {
    ECharts,
  },
  props: {
    title: {
      type: String,
      default: "Insert title as props",
    },
    data: {
      type: Array,
      required: true,
    },
    
  },
  data() {
    return {
      option: {
        title: {
          show: true,
          text: "faaa",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.data.map((element) => element.name),
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              // color: function (value, index) {
              //     const colorsChart = ["#82868b", "#3390e7", "#f89f43", "#00D25B", "#82868b"];
              //     return colorsChart[index];
              //   },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            minInterval: 1,
          },
        ],
        series: [
          {
            name: "Reservas",
            type: "bar",
            barWidth: "30%",
            emphasis: {
              focus: "series",
            },
            data: this.data.map((element) => element.value),
          },
        ],
      },
    };
  },
};
</script>
  
  <style>
.echarts {
  width: 90% !important;
  margin: auto;
}
</style>
  