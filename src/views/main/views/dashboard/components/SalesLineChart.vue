<template>
  <div>
    <!-- <b-row class="match-height">
      <b-col lg="6">
        <card-analytic-support-tracker />
      </b-col>
      <b-col lg="6">
        <card-analytic-avg-sessions />
      </b-col>
      <b-col lg="8">
        <card-analytic-revenue-report />
      </b-col>
      <b-col lg="4">
        <card-analytic-goal-overview />
      </b-col>
      <b-col lg="8">
        <card-analytic-revenue />
      </b-col>
      <b-col lg="4">
        <card-analytic-sales-radar-chart />
      </b-col>
    </b-row> -->

    <b-row>
      <b-col lg="8">
        <b-row class="match-height">
          <b-col cols="12">
            <card-analytic-sale-line-chart />
          </b-col>
          <!-- <b-col md="6">
            <card-analytic-sessions-by-device />
          </b-col>
          <b-col md="6">
            <card-analytic-customers />
          </b-col> -->
        </b-row>
      </b-col>
      <!-- <b-col lg="4">
        <card-analytic-product-orders />
        <card-analytic-earnings-chart />
      </b-col> -->
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";

// import CardAnalyticSessionsByDevice from '@/views/card/card-analytic/CardAnalyticSessionsByDevice.vue'
// import CardAnalyticProductOrders from '@/views/card/card-analytic/CardAnalyticProductOrders.vue'
// import CardAnalyticCustomers from '@/views/card/card-analytic/CardAnalyticCustomers.vue'
// import CardAnalyticSalesRadarChart from '@/views/card/card-analytic/CardAnalyticSalesRadarChart.vue'
// import CardAnalyticSupportTracker from '@/views/card/card-analytic/CardAnalyticSupportTracker.vue'
// import CardAnalyticRevenue from '@/views/card/card-analytic/CardAnalyticRevenue.vue'
// import CardAnalyticGoalOverview from '@/views/card/card-analytic/CardAnalyticGoalOverview.vue'
// import CardAnalyticAvgSessions from '@/views/card/card-analytic/CardAnalyticAvgSessions.vue'
import CardAnalyticSaleLineChart from "@/views/card/card-analytic/CardAnalyticSaleLineChart.vue";
// import CardAnalyticRevenueReport from '@/views/card/card-analytic/CardAnalyticRevenueReport.vue'
// import CardAnalyticEarningsChart from '@/views/card/card-analytic/CardAnalyticEarningsChart.vue'

export default {
  components: {
    BRow,
    BCol,
    // CardAnalyticSessionsByDevice,
    // CardAnalyticProductOrders,
    // CardAnalyticCustomers,
    // CardAnalyticSalesRadarChart,
    // CardAnalyticSupportTracker,
    // CardAnalyticRevenue,
    // CardAnalyticGoalOverview,
    // CardAnalyticAvgSessions,
    CardAnalyticSaleLineChart,
    // CardAnalyticRevenueReport,
    // CardAnalyticEarningsChart,
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
