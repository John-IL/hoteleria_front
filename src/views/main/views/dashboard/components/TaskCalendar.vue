<template>
  <div class="w-100">
    <div
      v-if="design === 'badge'"
      class="align-items-center justify-content-center text-center"
    >
      <!-- :variant="taskColor[event.type]" -->

      <b-badge
        v-for="event in events"
        :key="event.id"
        pill
        :style="{
          backgroundColor: event.color,
        }"
        class="m-1"
        style="
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 150px;
        "
      >
        <span style="color: #000000">{{ event.client }}</span>
      </b-badge>
    </div>
    <div v-else>
      <b-row
        v-for="event in events"
        :key="event.id"
        class="m-auto d-flex align-items-center justify-content-center text-center"
      >
        <div class="card mt-1">
          <div class="card-content">
            <div class="card-body">
              <b-row>
                <b-col cols="6" class="d-flex align-items-center">
                  <i class="feather icon-home font-large-1 primary"></i>
                </b-col>
                <b-col cols="6">
                  <!-- <h6>{{ event }}</h6> -->
                  <span>Upcoming Events</span>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "TaskCalendar",
  props: {
    design: {
      type: String,
      default: "badge",
    },
    events: {
      type: Array | Object,
      required: true,
    },
    type: {
      type: String,
    },
  },
  components: {
    VuePerfectScrollbar,
  },
  computed: {
    ...mapGetters({
      skin: "appConfig/skin",
      currentUser: "auth/currentUser",
    }),
    moduleId() {
      return this.$route.matched[0].meta.module;
    },
  },
  data() {
    return {
      taskColor: {
        TEL: "primary",
        CN: "primary",
        Personal: "primary",
        Family: "primary",
        ETC: "primary",
      },
    };
  },
  methods: {
    async doneTask(e, id) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   const confirm = await this.showConfirmSwal(
      //     "Are you sure?",
      //     "You won't be able to revert this!"
      //   );
      //   if (confirm.isConfirmed) {
      //     try {
      //       const response = await CalendarService.doneTaskById({
      //         idUser: this.currentUser.user_id,
      //         idTask: id,
      //       });
      //       if (this.isResponseSuccess(response)) {
      //         this.$emit("emitEventDateChange");
      //         this.$swal.fire({
      //           icon: "success",
      //           title: "Successfully",
      //         });
      //       } else {
      //         this.showToast(
      //           "warning",
      //           "top-right",
      //           "Warning!",
      //           "AlertTriangleIcon",
      //           `Something went wrong. ${response.message}`
      //         );
      //       }
      //     } catch (error) {
      //       this.showErrorSwal(error);
      //     }
      //   }
    },
    async openMOdalEditAsignFanpage(t_data) {
      this.$emit("openMOdalEditAsignFanpage", t_data);
    },
  },
};
</script>

<style scoped>
</style>
