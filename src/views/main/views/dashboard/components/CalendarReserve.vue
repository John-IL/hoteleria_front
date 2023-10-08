<template>
  <b-row>
    <b-col
      cols="12"
      class="d-flex justify-content-between align-items-center my-2"
    >
      <!-- left buttons -->
      <div>
        <div
          class="d-flex align-items-center justify-content-sm-start justify-content-between w-100"
        >
          <div>
            <b-button
              class="mr-05 btn-icon rounded-circle"
              size="sm"
              variant="flat-primary"
              @click="beforeMonth"
            >
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
                class="cursor-pointer"
              />
            </b-button>
            <b-button
              class="mr-05 btn-icon rounded-circle"
              size="sm"
              variant="flat-primary"
              @click="afterMonth"
            >
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
                class="cursor-pointer"
              />
            </b-button>
          </div>
          <span
            class="d-flex align-items-center justify-content-center m-0 font-medium-5"
          >
            {{ currentMonth }} {{ year }}
          </span>
        </div>
      </div>

      <!-- right buttons -->
      <div>
        <b-form-radio-group
          size="sm"
          v-model="selectedOption"
          :options="calendarOptions"
          buttons
          button-variant="outline-primary"
        />
      </div>
    </b-col>

    <b-col cols="12" v-if="selectedOption === 'Meses'">
      <div class="w-100 border border-color seven-columns" v-if="visibleCalendar">
        <b-container
          v-for="(date, index) in calendarDates"
          :key="index"
          class="min-date-height border-color"
          :class="{
            'border-right':
              index % colsPerScreenWidth !== colsPerScreenWidth - 1,
            'border-bottom':
              Math.trunc(index / colsPerScreenWidth) !==
              Math.trunc((calendarDates.length - 1) / colsPerScreenWidth),
          }"
        >
          <b-row
            :class="{
              'disabled-date': date.type === 'before' || date.type === 'after',
            }"
          >
            <b-col cols="12">
              <b-row>
                <p
                  class="text-center w-100 m-0 font-weight-bolder border-bottom py-50"
                  :class="{
                    'current-date-class': today === date.full_date,
                  }"
                >
                  {{ daysList[index % 7] }} {{ date.date }}
                </p>
              </b-row>

              <b-row v-if="date.haveEvents" class="py-1">
                <task-calendar
                  :events="date.events"
                  :type="'appointment'"
                  :design="'badge'"
                />
              </b-row>

              <b-row v-else>
                <b-col class="align-items-center" cols="12">
                  <div
                    class="w-100 m-auto d-flex align-items-center justify-content-center text-center"
                  >
                    <span class="m-0 font-weight-bolder font-medium-1 pt-3">
                      -
                    </span>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-col>
    <b-row v-if="selectedOption === 'Lista'" class="mx-2">
      <div
        v-for="(day, key) in listEvents"
        :key="key"
        class="w-100 border mb-2 border-color"
      >
        <b-row
          class="m-0"
          :style="'background-color: ' + listTitleBackgroundColor"
        >
          <b-col
            class="border-color d-flex align-items-center justify-content-between px-1 border-bottom py-1"
          >
            <span class="m-0 font-weight-bolder font-medium-1">
              {{ currentMonth }} {{ day.date }}, {{ year }}
            </span>
            <span class="m-0 font-weight-bolder font-medium-1">
              {{
                daysList[
                  $moment(
                    monthsList.indexOf(currentMonth) +
                      1 +
                      "/" +
                      day.date +
                      "/" +
                      year
                  ).day()
                ]
              }}
            </span>
          </b-col>
        </b-row>
        <b-row class="seven-columns m-0">
          <task-calendar :events="day.events" :type="'appointment'" />
        </b-row>
      </div>
    </b-row>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import TaskCalendar from "@/views/main/views/dashboard/components/TaskCalendar.vue";
import DashboardService from "@//views/card/card-statistic/services/dashboard.service.js";
import { between } from "vee-validate/dist/rules";

export default {
  name: "LCalendar",
  components: {
    TaskCalendar,
  },
  props: {
    design: {
      type: String,
      default: "full",
    },
    dateLocation: {
      type: String,
      default: "date",
    },
    dateLocationFormat: {
      type: String,
      default: "YYYY-MM-DD",
    },
    listTitleBackgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  data() {
    return {
      // events: [
      //   {
      //     id: 12297,
      //     date: "2023-04-20",
      //     type: "event",
      //   },
      //   {
      //     id: 12255,
      //     date: "2023-04-20",
      //   },
      //   {
      //     id: 12298,
      //     date: "2023-03-05",
      //   },
      //   {
      //     id: 12299,
      //     date: "2023-03-31",
      //   },
      //   {
      //     id: 12300,
      //     date: "2023-05-05",
      //   },
      // ],
      events: [],
      visibleCalendar: false,
      month: "",
      year: "",
      currentDay: "",
      lastDayOfCurrentMonth: "",
      firstDayOfCurrentMonth: "",
      calendarOptions: ["Meses", "Lista"],
      selectedOption: "Meses",
      monthsList: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      daysList: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      calendarDates: [],
    };
  },
  computed: {
    currentNumberMonth() {
      return this.monthsList
        .indexOf(this.currentMonth)
        .toString()
        .padStart(2, 0);
    },
    today() {
      return this.$moment().format("YYYY-MM-DD");
    },
    ...mapGetters({
      currentUser: "auth/currentUser",
    }),
    colsPerScreenWidth() {
      if (this.screenWidth > 1120) return 7;
      if (this.screenWidth > 1024) return 6;
      if (this.screenWidth > 938) return 5;
      if (this.screenWidth > 690) return 3;
      if (this.screenWidth > 425) return 2;
      return 1;
    },
    listEvents() {
      return this.calendarDates.filter(
        (val) =>
          val.haveEvents === true &&
          ((parseInt(this.currentNumberMonth) + 1).toString().padStart(2, 0) ==
            val.month ||
            (parseInt(this.currentNumberMonth) + 2).toString().padStart(2, 0) ==
              val.month ||
            this.currentNumberMonth == val.month)
      );
    },
    currentMonth() {
      return this.monthsList[this.month];
    },
  },
  created() {
    this.currentDay = this.$moment();
    this.month = this.currentDay.month();
    this.year = this.currentDay.year();
    this.assignMonth();
    this.getCalendarReserves();
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.assignMonth();
  //   }, 1000);
  // },

  methods: {
    getRandomDarkColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 6) + 6];
      }
      return color;
    },

    async getCalendarReserves() {
      const start_date =
        this.year +
        "-" +
        this.calendarDates[0].month +
        "-" +
        this.calendarDates[0].date;

      const end_date =
        this.year +
        "-" +
        this.calendarDates[this.calendarDates.length - 1].month +
        "-" +
        this.calendarDates[this.calendarDates.length - 1].date
          .toString()
          .padStart(2, 0);
      const { data } = await DashboardService.getCalendarReserves({
        start_date: start_date,
        end_date: end_date,
      });

      this.visibleCalendar = false;
      data.forEach((reserve) => {
        let color = this.getRandomDarkColor();
        if (reserve.id !== this.events[this.events.length - 1]?.id) {
          color = this.getRandomDarkColor();
        }

        for (
          let date = moment(reserve.start_date);
          date.isSameOrBefore(moment(reserve.end_date));
          date.add(1, "day")
        ) {
          this.events.push({
            id: reserve.id,
            date: date.format("YYYY-MM-DD"),
            type: "event",
            client: reserve.client,
            color: color,
          });
          console.log(this.events);
        }
      });
      this.visibleCalendar = true;
    },

    getEvents(date) {
      let events = [];
      this.events.forEach((event) => {
        if (event.date === date) {
          events.push(event);
        }
      });

      return events || [];
    },

    assignMonth() {
      const currentMonthInfo = this.$moment(
        `${this.month + 1}/01/${this.year}`
      );

      const beforeMonth = this.month - 1 === -1 ? 11 : this.month - 1;
      const beforeMonthInfo = this.$moment(
        `${beforeMonth + 1}/01/${
          this.month - 1 === -1 ? this.year - 1 : this.year
        }`
      );
      const lastDayOfBeforeMonth = beforeMonthInfo.endOf("month");
      this.lastDayOfCurrentMonth = currentMonthInfo.endOf("month");
      this.calendarDates = [];

      if (lastDayOfBeforeMonth.day() < 6) {
        for (let i = 0; i <= lastDayOfBeforeMonth.day(); i += 1) {
          let month = this.month.toString().padStart(2, "0");
          let full_date = `${this.year}-${month}-${
            lastDayOfBeforeMonth.date() - (lastDayOfBeforeMonth.day() - i)
          }`;

          let events = this.getEvents(full_date);

          this.calendarDates.push({
            date:
              lastDayOfBeforeMonth.date() - (lastDayOfBeforeMonth.day() - i),
            type: "before",
            month: month,
            events: events,
            haveEvents: events.length > 0 ? true : false,
            numberOfEvents: events.length,
            full_date: full_date,
          });
        }
      }
      for (let i = 1; i <= this.lastDayOfCurrentMonth.date(); i += 1) {
        let month = (this.month + 1).toString().padStart(2, "0");
        let today = `${this.year}-${month}-${i < 10 ? "0" + i : i}`;

        let events = this.getEvents(today);

        this.calendarDates.push({
          date: i,
          month: month,
          full_date: today,
          type: "current",
          events: events,
          haveEvents: events.length > 0 ? true : false,
          numberOfEvents: events.length,
        });
      }
      if (this.lastDayOfCurrentMonth.day() < 6) {
        for (let i = 1; i <= 6 - this.lastDayOfCurrentMonth.day(); i += 1) {
          let month = (this.month + 2).toString().padStart(2, "0");
          let nextMoth = `${this.year}-${month}-${i < 10 ? "0" + i : i}`;

          let events = this.getEvents(nextMoth);

          this.calendarDates.push({
            date: i,
            month: month,
            type: "after",
            events: events,
            haveEvents: events.length > 0 ? true : false,
            numberOfEvents: events.length,
          });
        }
      }
    },
    beforeMonth() {
      this.month -= 1;
      if (this.month === -1) {
        this.month = 11;
        this.year -= 1;
      }
      this.assignMonth();
      this.getCalendarReserves();
    },

    afterMonth() {
      this.month += 1;
      if (this.month === 12) {
        this.month = 0;
        this.year += 1;
      }
      this.assignMonth();
      this.getCalendarReserves();
    },
  },
};
</script>

<style scoped>
.mr-05 {
  margin-right: 5px;
}
.seven-columns {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
.min-date-height {
  min-height: 150px;
  overflow-x: hidden;
}

.disabled-date {
  opacity: 0.5;
}
.current-date-class {
  background-color: #00d25b;
  color: white;
}
.border-color {
  border-color: #c4c4c4 !important;
}
@media (max-width: 1120px) {
  .seven-columns {
    display: grid !important;
    grid-template-columns: repeat(6, 1fr) !important;
  }
}
@media (max-width: 1024px) {
  .seven-columns {
    display: grid !important;
    grid-template-columns: repeat(5, 1fr) !important;
  }
}
@media (max-width: 938px) {
  .seven-columns {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
@media (max-width: 690px) {
  .seven-columns {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
@media (max-width: 425px) {
  .seven-columns {
    display: grid !important;
    grid-template-columns: repeat(1, 1fr) !important;
  }
}
</style>