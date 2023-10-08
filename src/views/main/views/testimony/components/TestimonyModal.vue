<template>
  <div>
    <b-modal
      :title="title"
      v-model="showModal"
      modal-class="modal-primary"
      hide-footer
      @hidden="close"
      size="lg"
      loading
    >
      <validation-observer ref="checkForm" #default="{ invalid }" v-if="true">
          <b-row>
            <b-col xl="8" lg="8" md="8" sm="8" xs="8" cols="8" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-document-type">Cliente</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="document_type"
                  vid="document_type"
                  rules="chat-compose-required"
                >
                  <v-select
                    small
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="testimony.client"
                    :options="clients"
                    :reduce="(val) => val.id"
                    label="name"
                    class="w-100"
                    hint="Seleccione un cliente"
                    :disabled="disableAll"
                  ></v-select>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col xl="4" lg="4" md="4" sm="4" xs="4" cols="4" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-document-type">Reserva</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="reserve"
                  vid="reserve"
                  rules="chat-compose-required"
                >
                  <v-select
                    small
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="testimony.reserve"
                    :options="reserves"
                    :reduce="(val) => val.id"
                    label="name"
                    class="w-100"
                    hint="Seleccione una reserva"
                    :disabled="disableAll"
                  ></v-select>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12" class="mt-1">
              <b-table striped hover :items="rooms" :fields="fields"></b-table>
            </b-col>
            <b-col cols="12" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="description">Descripción</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="description"
                  vid="description"
                  rules="max:255|required"
                >
                  <b-input-group>
                    <b-textarea
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="testimony.description"
                      type="text"
                      placeholder="Ingrese la descripción de la categoria"
                      :disabled="disableAll"
                      :rows="3"
                    ></b-textarea>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" class="mt-2">
              <div class="d-flex justify-content-end">
                <b-button
                  type="submit"
                  class="mx-1"
                  variant="light"
                  :disabled="disableAll"
                  @click="close"
                >
                  Cancelar
                </b-button>
                <b-button
                  v-if="!loading"
                  type="submit"
                  variant="primary"
                  @click="registerTestimony"
                  :disabled="invalid || disableAll"
                >
                  Guardar
                </b-button>
                <b-button v-else variant="primary" disabled>
                  <b-spinner small />
                  Cargando...
                </b-button>
              </div>
            </b-col>
          </b-row>
      </validation-observer>
    </b-modal>
  </div>
</template>
  
<script>
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import TestimonialService from "@/views/main/views/testimony/services/testimonial.service.js";
import ClientService from "@/views/main/views/client/services/client.service.js";
import ReserveService from "@/views/main/views/reserve/service/reserve.service.js";

export default {
  mixins: [togglePasswordVisibility],
  props: {
    testimonyModal: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      title: "Crear testimonio",
      showModal: true,
      loading: false,
      disableAll: false,
      fields: [
        {
          key: "id",
          label: "N°",
          visible: true,
        },
        {
          key: "name",
          label: "Nombre",
          visible: true,
        },
        {
          key: "number",
          label: "Numero",
          visible: true,
        },
      ],
      disable: {
        type: true,
        first_name: true,
        last_name: true,
      },
      testimony: {
        reserve: null,
        client: null,
        description: null,
      },
      rooms: [],
      reserves: [],
      clients: [],
    };
  },

  methods: {
    close(action = false) {
      this.$emit("close", action);
    },

    clearDetail() {
      this.testimony = {
        reserve: null,
        room: null,
      };
      this.rooms = [];
      this.reserves = [];
    },

    async getClients() {
      const response = await ClientService.listSelect();
      this.clients = response.data;
    },

    async getReserves(client) {
      const params = {
        client_id: client,
      };
      const response = await ReserveService.listReservesByClient(params);
      this.reserves = response.data.map((element) => ({
        id: element.id,
        name: element.id,
        ...element,
      }));
    },

    async registerTestimony() {
      const response = await this.$refs.checkForm.validate();
      if (response) {
        await this.register();
      }
    },
    async register() {
      this.loading = true;
      await this.addPreloader();
      let response = {};
      try {
        if (this.testimonyModal.type == "edit") {
          response = await TestimonialService.update(this.room);
        } else {
          response = await TestimonialService.register(this.testimony);
        }

        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title:
                this.testimonyModal.type == "edit"
                  ? "Testimonio Actualizada"
                  : "Testimonio Registrada",
              icon: "ThumbsUpIcon",
              variant: "success",
              text: response.data.message,
            },
          });
        } else {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Error",
              icon: "AlertTriangleIcon",
              variant: "danger",
              text: response.data.message,
            },
          });
        }
      } catch (error) {
        this.loading = false;
        this.disableAll = true;

        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Error",
            icon: "AlertTriangleIcon",
            variant: "danger",
            text: error.response?.data?.error,
          },
        });
        // }
      } finally {
        this.loading = false;
        this.disableAll = false;
        await this.removePreloader();
      }
    },
  },

  created() {
    this.getClients();
  },

  watch: {
    "testimony.client"(newValue) {
      if (newValue == null) {
        this.clearDetail();
        return;
      }

      this.getReserves(newValue);
    },

    "testimony.reserve"(newValue) {
      if (newValue == null) {
        return;
      }
      // this.rooms = this.reserves.filter((element) => (element.id = newValue));
      const currentReserve = this.reserves.filter(
        (element) => element.id == newValue
      );
      this.rooms = currentReserve[0].rooms;
    },
  },
};
</script>
  
<style></style>