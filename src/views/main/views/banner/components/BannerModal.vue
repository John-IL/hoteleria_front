<template>
  <div>
    <b-modal
      :title="bannerModal.type == 'edit' ? 'Editar Baner' : 'Registrar Baner'"
      v-model="showModal"
      modal-class="modal-primary"
      hide-footer
      @hidden="close"
      size="lg"
      loading
    >
      <validation-observer ref="checkForm" #default="{ invalid }">
        <b-row>
          <b-col cols="6" class="mt-1">
            <b-form-group>
              <div class="d-flex justify-content-between text-white">
                <label for="user-last-name">Nombre</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="name"
                vid="name"
                rules="chat-compose-required|min:3"
              >
                <b-input-group>
                  <b-form-input
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="banner.name"
                    type="text"
                    placeholder="Ingrese el nombre del banner"
                  ></b-form-input>
                </b-input-group>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-category">N Habitacion</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="room"
                  vid="room"
                  rules="required"
                >
                  <b-input-group>
                    <v-select
                      small
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="banner.room_id"
                      :options="rooms"
                      :reduce="(val) => val.id"
                      label="number"
                      style="width: 84%"
                      hint="Seleccione una habitacion"
                    >
                      <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                          No se encontro resultado <em>{{ search }}</em
                          >.
                        </template>
                        <em v-else style="opacity: 0.5"
                          >Registre una categoría</em
                        >
                      </template></v-select
                    >
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

          <b-col cols="12" class="mt-1 d-flex justify-content-center">
            <b-form-group>
              <div
                class="d-flex justify-content-between text-white text-center"
              >
                <label for="image">Imagen</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="image"
                vid="image"
                rules="required"
              >
                <div
                  class="form-group cursor-pointer m-0"
                  @click="focusInputImage()"
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    @change="getImage"
                    hidden
                    required
                    ref="inputImage"
                    :class="{ 'border-danger rounded': errors[0] }"
                  />
                  <b-avatar
                    v-if="
                      banner.imageBanner == null || banner.imageBanner == ''
                    "
                    size="300px"
                    square
                    icon="cloud-upload"
                    class="image-banner"
                  ></b-avatar>
                  <figure class="text-center" v-else>
                    <img class="image-banner" :src="imageShow" alt="Icon" />
                  </figure>
                </div>
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
              >
                Borrar
              </b-button>
              <b-button
                v-if="!loading"
                type="submit"
                variant="primary"
                :disabled="invalid || disableAll"
                @click="register()"
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
import DefaulBanner from "@/assets/images/banner/banner-default.png";
import BannerServices from "@/views/main/views/banner/services/banner.service.js";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import RoomService from "@/views/main/views/room/services/room.service.js";
export default {
  props: {
    bannerModal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: true,
      loading: false,
      disableAll: false,
      disable: {
        type: true,
        first_name: true,
        last_name: true,
      },
      banner: {
        imageBanner: null,
        name: null,
      },
      rooms: []
    };
  },

  computed: {
    imageShow() {
      return this.banner.imageBanner;
    },
  },

  async mounted() {
    await this.getRooms();
  },

  methods: {
    close(action = false) {
      this.$emit("close", action);
    },

    focusInputImage() {
      this.$refs.inputImage.click();
    },

    getImage(e) {
      let file = e.target.files[0];
      if (file != undefined) {
        this.banner.banner = file;
        this.uploadImage(file);
      } else {
        this.banner.name = null;
        this.banner.imageBanner = DefaulBanner;
      }
    },

    uploadImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.banner.imageBanner = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    async getRooms(){
      const {data} = await RoomService.listSelect();
      this.rooms = data;
    },

    async registerCategory() {
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
        const titleMessage =
          this.bannerModal.type == "edit"
            ? "Baner Actualizado"
            : "Baner Registrado";
        const formData = new FormData();
        formData.append("banner", this.banner.banner);
        formData.append("name", this.banner.name);
        formData.append("room_id", this.banner.room_id)
        const headers = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }.bind(this),
        };

        if (this.bannerModal.type == "edit") {
          response = await BannerServices.update(this.banner);
        } else {
          response = await BannerServices.register(formData, headers.headers);
        }

        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: titleMessage,
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
            text: "Error al registrar la categoria",
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
  
<style scoped>
.image-banner {
  width: 80%;
  max-width: 85%;
  height: auto;
  border-radius: 12px !important;
  margin: 0 auto;
}
</style>
