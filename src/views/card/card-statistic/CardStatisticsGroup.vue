<template>
  <b-card no-body class="card-statistics">
    <b-card-header>
      <b-card-title>PAGINA DE ANÁLISIS</b-card-title>
      <b-card-text class="mr-25 mb-0"> Actualizado este mes </b-card-text>
      <b-button @click="generateReport" variant="outline-primary" size='sm'>Generar Reporte</b-button>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in statisticsItems"
          :key="item.icon"
          xl="3"
          lg="3"
          md="6"
          sm="6"
          xs="6"
          class="mb-2"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="95" :variant="item.color">
                <feather-icon size="24" :icon="item.icon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
              <span v-if="item.last >= 0 || item.last" class="text-secondary">Mes pasado: {{ item.last }}</span>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import DashboardService from "@/views/card/card-statistic/services/dashboard.service.js";
import ReportService from "@/views/main/views/report/services/report.service.js";
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
} from "bootstrap-vue";

export default {
  mounted() {
    this.getStatistics();
  },
  methods: {
    async getStatistics() {
      try {
        const { data } = await DashboardService.getIndicators();
        this.statisticsItems[0].title = data[0]._rooms;
        this.statisticsItems[1].title = data[0]._clients;
        this.statisticsItems[1].last = data[0]._last_clients;
        this.statisticsItems[2].title = data[0]._reserves;
        this.statisticsItems[2].last = data[0]._last_reserves;
        this.statisticsItems[3].title = "S/." + " " + Number(data[0]._sales).toFixed(2);
        this.statisticsItems[3].last = "S/." + " " + Number(data[0]._last_sales).toFixed(2);
      } catch (error) {
        console.log(error);
      }
    },
      async generateReport(){
      const params = {
      }
      const {data} = await ReportService.reportReserveForMonths(params) 
      await this.forceFileDownloadPdfWithDownload(data, 'Reporte_Reservas.pdf');
    }
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: "HomeIcon",
          color: "light-primary",
          title: "0",
          subtitle: "HABITACIONES DISPONIBLES HOY",
          customClass: "mb-2 mb-xl-0",
        },
        {
          icon: "UserIcon",
          color: "light-info",
          title: "0",
          subtitle: "CLIENTES NUEVOS",
          customClass: "mb-2 mb-xl-0",
          last: 0
        },
        {
          icon: "BoxIcon",
          color: "light-danger",
          title: "0",
          subtitle: "RESERVAS",
          customClass: "mb-2 mb-sm-0",
          last: 0
        },
        {
          icon: "DollarSignIcon",
          color: "light-success",
          title: "S/ 0",
          subtitle: "INGRESO MENSUAL",
          customClass: "",
          last: 0
        },
      ],
    };
  },
};
</script>
