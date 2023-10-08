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
                    v-model="user.document_type"
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
                      v-model="user.document_number"
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
                  <label for="user-role">Rol</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="role"
                  vid="role"
                  rules="chat-compose-required"
                >
                  <v-select
                    small
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="user.role"
                    :options="roles"
                    :reduce="(val) => val.id"
                    label="name"
                    class="w-100"
                    hint="Seleccione un rol"
                    :disabled="disableAll || disable.role"
                  ></v-select>
                  <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-role">Tipo</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="type"
                  vid="type"
                  rules="chat-compose-required"
                >
                  <v-select
                    small
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="user.personal_type"
                    :options="users_type"
                    :reduce="(val) => val.id"
                    label="label"
                    class="w-100"
                    hint="Seleccione un tipo"
                  ></v-select>
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
                      v-model="user.first_name"
                      type="text"
                      :placeholder="
                        user.document_type == 1
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

            <b-col cols="6" v-if="user.document_type == 1" class="mt-1">
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
                      v-model="user.last_name"
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
                      v-model="user.phone"
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
                    v-model="user.country"
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
                      v-model="user.email"
                      autocomplete="new-email"
                      type="email"
                      placeholder="ejemplo@gmail.com"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1" v-if="userModal.type != 'edit'">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-password">Contraseña</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="password"
                  vid="password"
                  rules="chat-compose-required|specialpassword"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="user.password"
                      :type="passwordFieldType"
                      placeholder="************"
                      autocomplete="new-password"
                      :disabled="disableAll"
                    ></b-form-input>
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger" v-html="errors[0]"></small>
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
                  v-if="userModal.type != 'edit'"
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
                  @click="registerUser"
                >
                  {{ userModal.type != "edit" ? "Guardar" : "Actualizar" }}
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
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import UserServices from "@/views/main/views/user/services/users.service.js";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  mixins: [togglePasswordVisibility],
  props: {
    userModal: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      label: {
        first_name: "Nombres",
      },

      roles: [],
      title:
        this.userModal.type == "edit" ? "Actualizar Usuario" : "Nuevo Usuario",

      showModal: true,
      loading: false,
      countries: [],
      document_types: [],
      disableAll: false,
      disable: {
        type: true,
        first_name: true,
        last_name: true,
        document_number: false,
        document_type: false,
        role: false,
      },
      user: this.userModal.data,
      users_type: [
        { id: 1, label: "ADMINISTRADOR" },
        { id: 2, label: "CHEF" },
        { id: 3, label: "SEGURIDAD" },
        { id: 4, label: "RECEPCIONISTA" },
        { id: 5, label: "LIMPIEZA" },
      ],
      reniec_token: process.env.VUE_APP_RENIEC_TOKEN,
    };
  },
  async mounted() {
    await this.getRoles();
    await this.getDocumentTypes();
    await this.getCountries();
    this.setDocumentType();
    this.disableInputInUpdate();
  },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  watch: {
    "user.document_type": function (val) {
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
      this.user = {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        phone: null,
        country: 1,
        document_type: 1,
        document_number: null,
        type: null,
        role: 2,
        personal_type: 5,
      };
    },

    disableInputInUpdate() {
      if (this.userModal.type == "edit") {
        this.disable.document_number = true;
        this.disable.document_type = true;
        this.disable.role = true;
      }
    },

    async searchEntityByDocumentNumber() {
      try {
        await this.addPreloader();
        this.disableAll = true;
        const type = this.user.document_type == 1 ? "dni" : "ruc";
        const data = await fetch(
          `https://dniruc.apisperu.com/api/v1/${type}/${this.user.document_number}?token=${this.reniec_token}`
        );

        if (type == "dni") {
          await this.searchClient(data);
        } else {
          await this.searchCompany(data);
        }
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Error",
            icon: "AlertTriangleIcon",
            variant: "danger",
            text: "No se encontró ningún resultado.",
          },
        });
      } finally {
        this.disableAll = false;
        await this.removePreloader();
      }
    },

    async searchClient(data) {
      const { success, nombres, apellidoPaterno, apellidoMaterno } =
        await data.json();
      if (success) {
        this.user.first_name = nombres;
        this.user.last_name = `${apellidoPaterno} ${apellidoMaterno}`;
      }
    },

    async searchCompany(data) {
      const { success, razonSocial } = await data.json();
      if (success) {
        this.user.first_name = razonSocial;
      }
    },

    async getRoles() {
      try {
        const { data } = await UserServices.getRoles();
        this.roles = data;
      } catch (error) {
        console.log(error);
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

    async registerUser() {
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
        if (this.userModal.type == "edit") {
          response = await UserServices.update(this.user);
        } else {
          response = await UserServices.register(this.user);
        }

        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Usuario Registrado",
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