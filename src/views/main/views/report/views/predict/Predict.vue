<template>
  <div>
    <div class="card">
      <div class="p-2">
        <validation-observer #default="{ invalid }">
          <b-row>
            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-country">Tipo de prediccion: </label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="country"
                  vid="country"
                  rules="chat-compose-required"
                >
                  <v-select
                    small
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="form.type"
                    :options="predictionsType"
                    :reduce="(val) => val.id"
                    label="name"
                    class="w-100"
                    hint="Seleccione un tipo"
                  ></v-select>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="name">Mes: </label>
                </div>
                <b-button @click="addNewMonth">
                  <feather-icon icon="PlusIcon" class="mr-1"></feather-icon>
                  Agregar 1 Mes
                </b-button>
              </b-form-group>
            </b-col>
            <b-col cols="3" class="mt-1">
              <b-button
                variant="danger"
                class="mt-2"
                @click="deleteLastMonth"
                :disabled="months.length == 1"
                ><feather-icon icon="TrashIcon"></feather-icon> Eliminar Ultimo
                Mes</b-button
              >
            </b-col>
            <b-col cols="12">
              <b-row v-for="(month, index) in months" v-bind:key="index">
                <b-col cols="3" class="mt-1">
                  <b-form-group>
                    <div class="d-flex justify-content-between text-white">
                      <label for="name">Mes: </label>
                    </div>
                    <b-input-group>
                      <b-form-input
                        v-model="month.Mes"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col cols="2" class="mt-1">
                  <b-form-group>
                    <div class="d-flex justify-content-between text-white">
                      <label for="name">Promociones: </label>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="name"
                      vid="name"
                      rules="max:100|required"
                    >
                      <b-input-group>
                        <b-form-input
                          v-model="month.Promociones"
                          :class="{ 'border-danger rounded': errors[0] }"
                          type="number"
                        ></b-form-input>
                      </b-input-group>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="2" class="mt-1">
                  <b-form-group>
                    <div class="d-flex justify-content-between text-white">
                      <label for="name">Feriados: </label>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="name"
                      vid="name"
                      rules="max:100|required"
                    >
                      <b-input-group>
                        <b-form-input
                          v-model="month.Feriados"
                          :class="{ 'border-danger rounded': errors[0] }"
                          type="number"
                        ></b-form-input>
                      </b-input-group>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="2" class="mt-1">
                  <b-form-group>
                    <div class="d-flex justify-content-between text-white">
                      <label for="name">Vacaciones: </label>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="name"
                      vid="name"
                      rules="max:100|required"
                    >
                      <b-input-group>
                        <b-form-input
                          v-model="month.Vacaciones"
                          :class="{ 'border-danger rounded': errors[0] }"
                          type="number"
                          disabled
                        ></b-form-input>
                      </b-input-group>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="2" class="mt-1">
                  <b-form-group>
                    <div class="d-flex justify-content-between text-white">
                      <label for="name">Eventos: </label>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="name"
                      vid="name"
                      rules="max:100|required"
                    >
                      <b-input-group>
                        <b-form-input
                          v-model="month.Eventos"
                          :class="{ 'border-danger rounded': errors[0] }"
                          type="number"
                        ></b-form-input>
                      </b-input-group>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" class="mt-2">
              <div class="d-flex justify-content-end">
                <b-button
                  type="submit"
                  class="mx-1"
                  @click="initMonths"
                  variant="light"
                >
                  Limpiar
                </b-button>
                <b-button
                  v-if="loading"
                  type="submit"
                  @click="predict"
                  variant="primary"
                  :disabled="invalid"
                >
                  Predecir
                </b-button>
                <b-button v-else variant="primary" disabled>
                  <b-spinner small />
                  Cargando...
                </b-button>
              </div>
            </b-col>
          </b-row>
        </validation-observer>
      </div>
    </div>
    <modal-chart
      v-if="modal.status"
      @close="modal.status = false"
      :dataModal="modal"
    ></modal-chart>
  </div>
</template>

<script>
import ModalChart from "@/views/main/views/report/components/ModalChart.vue";
import ReportService from "@/views/main/views/report/services/report.service.js";
export default {
  components: {
    ModalChart,
  },
  data() {
    return {
      loading: true,
      predictionsType: [{ id: 0, name: "Reservas por meses" }],
      modal: {
        status: false,
        title: "",
        data: [],
      },
      form: {},
      months: [],
      prevMonth: 0,
    };
  },
  methods: {
    async predict() {
      try {
        this.modal.data = []
        await this.addPreloader();
        const params = {
          data_predict: this.months,
        };
        const { data } = await ReportService.predictReserve(params);
        this.parseDateForCharts(data)
        this.modal.title = this.predictionsType[this.form.type].name;
        this.modal.status = true;
        console.log(this.modal.data)
      } catch (e) {
        console.log(e);
      } finally {
        await this.removePreloader();
      }
    },

    initMonths() {
      this.prevMonth = 0;
      this.months = [
        {
          Mes: this.searchMonth(),
          Promociones: 0,
          Feriados: 0,
          Vacaciones:
            this.searchMonth() == "Enero" || this.searchMonth() == "Diciembre"
              ? 1
              : 0,
          Eventos: 0,
        },
      ];
      this.prevMonth = 1;
    },

    searchMonth() {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth();
      const reduceMonth = this.prevMonth == 0 ? 0 : 1;
      const nextMonth = (mesActual + this.prevMonth - reduceMonth) % 12;
      const meses = [
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
      ];
      return meses[nextMonth];
    },

    addNewMonth() {
      this.prevMonth += 1;
      this.months.push({
        Mes: this.searchMonth(),
        Promociones: 0,
        Feriados: 0,
        Vacaciones:
          this.searchMonth() == "Enero" || this.searchMonth() == "Diciembre"
            ? 1
            : 0,
        Eventos: 0,
      });
    },

    parseDateForCharts(resultPredict) {
      for (let index = 0; index < resultPredict.length; index++) {
        const element = this.months[index];
        this.modal.data.push({
          value: Number(resultPredict[index][0].toFixed(0)),
          name: element.Mes,
        });
      }
    },

    deleteLastMonth() {
      this.prevMonth--;
      this.months.pop();
    },
  },

  created() {
    this.initMonths();
  },
};
</script>