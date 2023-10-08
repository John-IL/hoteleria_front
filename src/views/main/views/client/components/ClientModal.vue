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
      ref="modal-users-register"
    >
      <validation-observer ref="checkForm" #default="{ invalid }">
        <div>
          <b-row>
            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-document-type">Tipo de Documento</label>
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
                    v-model="client.document_type"
                    :options="document_types"
                    :reduce="(val) => val.id"
                    label="name"
                    class="w-100"
                    hint="Seleccione un tipo de documento"
                    :disabled="disableAll || disable.document_type"
                  ></v-select>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-document-number">Número de Documento</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="doccument_number"
                  vid="doccument_number"
                  rules="required|max:20"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="client.document_number"
                      v-mask="'###########'"
                      type="text"
                      placeholder="Ingrese su número de documento"
                      :disabled="disableAll || disable.document_number"
                      @keypress.enter="searchEntityByDocumentNumber"
                    ></b-form-input>
                    <b-input-group-append is-text>
                      <b-button
                        class="cursor-pointer p-0 m-0"
                        size="sm"
                        variant="outlined-primary"
                        @click="searchEntityByDocumentNumber"
                        :disabled="disable.search_button"
                      >
                        <feather-icon icon="SearchIcon" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-first-name">{{ label.first_name }}</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="first name"
                  vid="first_name"
                  rules="chat-compose-required|min:2"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="client.first_name"
                      type="text"
                      :placeholder="
                        client.document_type == 1
                          ? 'Ingrese su nombre'
                          : 'Ingrese su razón social'
                      "
                      :disabled="disableAll || disable.first_name"
                    ></b-form-input>
                  </b-input-group>
                  <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" v-if="client.document_type == 1" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-last-name">Apellidos</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="last name"
                  vid="last_name"
                  rules="chat-compose-required|min:3"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="client.last_name"
                      type="text"
                      placeholder="Ingrese sus apellidos"
                      :disabled="disableAll || disable.last_name"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-phone">Teléfono</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  vid="phone"
                  rules="max:20"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="client.phone"
                      v-mask="'+## ###-###-###'"
                      type="text"
                      placeholder="Ingrese su teléfono"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-country">País</label>
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
                    v-model="client.country"
                    :options="countries"
                    :reduce="(val) => val.id"
                    label="name"
                    class="w-100"
                    hint="Seleccione un país"
                    :disabled="disableAll"
                  ></v-select>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-email">Correo</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="email"
                  vid="email"
                  rules="chat-compose-required|email"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="client.email"
                      autocomplete="new-email"
                      type="email"
                      placeholder="ejemplo@gmail.com"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" class="mt-2">
              <div class="d-flex justify-content-end">
                <b-button
                  variant="light"
                  :disabled="disableAll"
                  @click="close"
                  class="mr-1"
                >
                  Cancelar
                </b-button>
                <b-button
                  v-if="clientModal.type != 'edit'"
                  class="mr-1"
                  variant="warning"
                  :disabled="disableAll"
                  @click="initForm()"
                >
                  Limpiar
                </b-button>
                <b-button
                  v-if="!loading"
                  variant="primary"
                  :disabled="invalid || disableAll"
                  @click="registerClient"
                >
                  {{ clientModal.type != "edit" ? "Guardar" : "Actualizar" }}
                </b-button>
                <b-button v-else variant="primary" disabled>
                  <b-spinner small />
                  Cargando...
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </validation-observer>
    </b-modal>
  </div>
</template>
  
<script>
import UserServices from "@/views/main/views/user/services/users.service.js";
import ClientServices from "@/views/main/views/client/services/client.service.js";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  props: {
    clientModal: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      label: {
        first_name: "Nombres",
      },
      title:
        this.clientModal.type == "edit"
          ? "Actualizar Cliente"
          : "Nuevo Cliente",

      showModal: true,
      loading: false,
      countries: [],
      document_types: [],
      disableAll: false,
      disable: {
        first_name: true,
        last_name: true,
        document_number: false,
        document_type: false,
      },
      client: this.clientModal.data,
      reniec_token: process.env.VUE_APP_RENIEC_TOKEN,
    };
  },
  async mounted() {
    await this.getDocumentTypes();
    await this.getCountries();
    this.setDocumentType();
    this.disableInputInUpdate();
  },

  watch: {
    "client.document_type": function (val) {
      // client
      if (val == 1) {
        this.disable.first_name = true;
        this.disable.last_name = true;
        this.disable.search_button = false;
        this.label.first_name = "Nombres";
      } else if (val == 2) {
        this.disable.first_name = false;
        this.disable.last_name = false;
        this.disable.search_button = false;
        this.label.first_name = "Razón social";
      } else {
        this.disable.search_button = true;
      }
    },
  },
  methods: {
    setDocumentType() {
      if (this.document_type == 1) {
        this.disable.first_name = true;
        this.disable.last_name = true;
      }
    },

    initForm() {
      this.client = {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        country: 1,
        document_type: 1,
        document_number: null,
      };
    },

    disableInputInUpdate() {
      if (this.clientModal.type == "edit") {
        this.disable.document_number = true;
        this.disable.document_type = true;
        this.disable.role = true;
      }
    },

    async searchEntityByDocumentNumber() {
      try {
        await this.addPreloader();
        this.disableAll = true;
        const type = this.client.document_type == 1 ? "dni" : "ruc";
        const data = await fetch(
          `https://dniruc.apisperu.com/api/v1/${type}/${this.client.document_number}?token=${this.reniec_token}`
        );

        if (type == "dni") {
          await this.searchClient(data);
        } else {
          await this.searchCompany(data);
        }
      } catch (error) {
      } finally {
        this.disableAll = false;
        await this.removePreloader();
      }
    },

    async searchClient(data) {
      const { success, nombres, apellidoPaterno, apellidoMaterno } =
        await data.json();
      if (success) {
        this.client.first_name = nombres;
        this.client.last_name = `${apellidoPaterno} ${apellidoMaterno}`;
      }
    },

    async searchCompany(data) {
      const { success, razonSocial } = await data.json();
      if (success) {
        this.client.first_name = razonSocial;
      }
    },

    async getCountries() {
      try {
        const { data } = await UserServices.getCountries();
        this.countries = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getDocumentTypes() {
      try {
        const { data } = await UserServices.getDocumentTypes();
        this.document_types = data;
      } catch (error) {
        console.log(error);
      }
    },

    close(action = false) {
      this.$emit("close", action);
    },

    async registerClient() {
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
        if (this.clientModal.type == "edit") {
          response = await ClientServices.update(this.client);
        } else {
          response = await ClientServices.register(this.client);
        }
        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Cliente Registrado",
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
            // text: error.response?.data?.error,
            text: "Error al registrar el cliente",
          },
        });
      } finally {
        this.loading = false;
        this.disableAll = false;
        await this.removePreloader();
      }
    },
  },
};
</script>
  
<style></style>