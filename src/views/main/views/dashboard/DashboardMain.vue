<template>
  <section id="dashboard-analytics">
    <b-row>
        <b-col>
          <Statistics />
        </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <Calendar class="py-0" :design="'badge'" />
      </b-col>
    </b-row>
   
  </section>
</template>

<script>
import Calendar from "@/views/main/views/dashboard/components/CalendarReserve.vue";
import Statistics from "@/views/card/card-statistic/CardStatisticsGroup.vue";

export default {
  components: {
    Calendar,
    Statistics,
  },
  data() {
    return {
      data: {},
    };
  },

};
</script>
