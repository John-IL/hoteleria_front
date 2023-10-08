<template>
  <b-card>
    <e-charts ref="line" :options="option" autoresize />
  </b-card>
</template>

<script>
import ECharts from "vue-echarts";

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
    colors:{
      type: Array,
      required: false,
      default: function(){
        return []
      }
    }
  },
  data() {
    return {
      option: {
        
        title: {
          text: this.title,
          left: "center",
          textStyle: {
            color: "#c23531",
          },
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.data.map((element) => element.name),
          textStyle:{
            color: 'inherit'
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
 
        series: [
          {
            name: "Reservas de",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: this.data,
            // roseType: "radius",
            // color:this.colors,
            animationType: "scale",
            animationEasing: "elasticOut",
            
            animationDelay: function (idx) {
              return Math.random() * 200;
              
            },
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
