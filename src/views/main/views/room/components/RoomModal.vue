<template>
  <div>
    <b-modal
      :title="
        roomModal.type == 'edit'
          ? 'Actualizar Habitación'
          : 'Registrar Habitación'
      "
      v-model="showModal"
      modal-class="modal-primary"
      hide-footer
      @hidden="close"
      size="lg"
      loading
      no-close-on-backdrop
      no-close-on-esc
    >
      <validation-observer ref="checkForm" #default="{ invalid }" v-if="true">
          <b-row>
            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-floor">N° Piso</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="floor"
                  vid="floor"
                  rules="chat-compose-required"
                >
                  <v-select
                    small
                    :class="{ 'border-danger rounded': errors[0] }"
                    v-model="room.floor_id"
                    :options="floors"
                    :reduce="(val) => val.id"
                    label="number"
                    class="w-100"
                    hint="Seleccione un piso"
                    :disabled="disableAll"
                  ></v-select>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-promotion">Promoción</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="promotion"
                  vid="promotion"
                  rules="chat-compose-required"
                >
                  <b-input-group>
                    <v-select
                      small
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.promotion_id"
                      :options="promotions"
                      :reduce="(val) => val.id"
                      label="name"
                      style="width: 84%"
                      hint="Seleccione una promoción"
                      :disabled="disableAll"
                    >
                      <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                          No se encontro resultado <em>{{ search }}</em
                          >.
                        </template>
                        <em v-else style="opacity: 0.5"
                          >Registre las promociones</em
                        >
                      </template></v-select
                    >
                    <b-input-group-append>
                      <b-button
                        variant="outline-success"
                        @click="showPromotionModal = true"
                      >
                        <feather-icon icon="PlusIcon" size="15" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-category">Categoria</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="category"
                  vid="category"
                  rules="chat-compose-required"
                >
                  <b-input-group>
                    <v-select
                      small
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.category_id"
                      :options="categories"
                      :reduce="(val) => val.id"
                      label="name"
                      style="width: 84%"
                      hint="Seleccione una categoria"
                      :disabled="disableAll"
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
                    <b-input-group-append>
                      <b-button
                        class="w-100"
                        variant="outline-success"
                        @click="showCategoryModal = true"
                      >
                        <feather-icon icon="PlusIcon" size="15" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="user-document-number">Nombre</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="name"
                  vid="name"
                  rules="max:50"
                >
                  <b-input-group>
                    <b-form-input
                      maxlength="50"
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.name"
                      type="text"
                      placeholder="Ingrese un nombre"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="guest-number">N° Personas</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="guest-number"
                  vid="guest-number"
                  rules="chat-compose-required|max:2"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.guest_number"
                      type="text"
                      v-mask="'##'"
                      maxLength="2"
                      placeholder="N° de personas"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-number">N° habitación</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="room-number"
                  vid="room-number"
                  rules="required|max:3|unique-room"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.number"
                      type="text"
                      v-mask="'###'"
                      maxLength="3"
                      placeholder="N° de habitación"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" class="mt-1">
              <b-form-group
                label="Características:"
                label-for="room-features"
                v-if="roomModal.type == 'edit'"
              >
                <div class="checkbox-container">
                  <b-form-checkbox
                    v-model="room.has_bed"
                    value="1"
                    unchecked-value="0"
                    >Cama</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_tv"
                    value="1"
                    unchecked-value="0"
                    >TV</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_hot_water"
                    value="1"
                    unchecked-value="0"
                    >Agua caliente</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_jacuzzi"
                    value="1"
                    unchecked-value="0"
                    >Jacuzzi</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_private_bathroom"
                    value="1"
                    unchecked-value="0"
                    >Baño privado</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_couch"
                    value="1"
                    unchecked-value="0"
                    >Cochera</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_balcony"
                    value="1"
                    unchecked-value="0"
                    >Balcón</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-model="room.has_wifi"
                    value="1"
                    unchecked-value="0"
                    >WiFi</b-form-checkbox
                  >
                </div>
              </b-form-group>
              <b-form-group label="Características: " v-else>
                <b-form-checkbox-group v-model="room.characteristics">
                  <b-form-checkbox value="has_bed">Cama</b-form-checkbox>
                  <b-form-checkbox value="has_tv">TV</b-form-checkbox>
                  <b-form-checkbox value="has_hot_water"
                    >Agua caliente</b-form-checkbox
                  >
                  <b-form-checkbox value="has_jacuzzi">Jacuzzi</b-form-checkbox>
                  <b-form-checkbox value="has_private_bathroom"
                    >Baño privado</b-form-checkbox
                  >
                  <b-form-checkbox value="has_couch">Cochera</b-form-checkbox>
                  <b-form-checkbox value="has_balcony">Balcón</b-form-checkbox>
                  <b-form-checkbox value="has_wifi">WiFi</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-number">Precio</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="room-cost"
                  vid="room-cost"
                  rules="chat-compose-required"
                >
                  <b-input-group class="w-100">
                    <template v-slot:prepend>
                      <b-input-group-text>S/.</b-input-group-text>
                    </template>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.cost"
                      placeholder="Costo de la habitación"
                      v-mask="'###.###.##'"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="room-description">Descripción</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="room-description"
                  vid="room-description"
                  rules="chat-compose-required"
                >
                  <b-input-group>
                    <b-textarea
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="room.description"
                      placeholder="Ingrese una descripción"
                      :disabled="disableAll"
                      style="resize: none"
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
                  @click="close"
                  variant="light"
                  :disabled="disableAll"
                >
                  Cancelar
                </b-button>
                <b-button
                  v-if="!loading"
                  type="submit"
                  @click="registerRoom"
                  variant="primary"
                  :disabled="invalid || disableAll"
                >
                  {{ roomModal.type == "edit" ? "Actualizar" : "Guardar" }}
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
    <PromotionModal
      v-if="showPromotionModal"
      @close="showPromotionModal = false"
      type="nooptional"
      :promotionModal="{}"
      @refreshTable="getRoomPromotions"
    />

    <CategoryModal
      v-if="showCategoryModal"
      @close="showCategoryModal = false"
      type="nooptional"
      @refreshTable="getRoomCategories"
    />
  </div>
</template>
  
<script>
import RoomService from "@/views/main/views/room/services/room.service.js";
import PromotionModal from "@/views/main/views/promotions/components/PromotionModal.vue";
import CategoryModal from "@/views/main/views/category/components/CategoryModal.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  props: {
    roomModal: {
      required: true,
      type: Object,
    },
  },
  components: {
    PromotionModal,
    CategoryModal,
  },
  data() {
    return {
      showPromotionModal: false,
      showCategoryModal: false,
      title: "Crear Habitación",
      showModal: true,
      loading: false,
      floors: [],
      promotions: [],
      categories: [],
      disableAll: false,
      disable: {
        type: true,
        first_name: true,
        last_name: true,
      },
      room: { ...this.roomModal.data },
    };
  },

  async mounted() {
    await this.getRoomCategories();
    await this.getRoomFloors();
    await this.getRoomPromotions();
  },

  methods: {
    async getRoomPromotions() {
      try {
        const { data, status } = await RoomService.getRoomPromotions();
        if (status === 200) {
          this.promotions = data;
        }
      } catch (error) {
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
      }
    },

    async getRoomFloors() {
      try {
        const { data, status } = await RoomService.getRoomFloors();
        if (status === 200) {
          this.floors = data;
        }
      } catch (error) {
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
      }
    },
    async getRoomCategories() {
      try {
        const { data, status } = await RoomService.getRoomCategories();
        if (status === 200) {
          this.categories = data;
        }
      } catch (error) {
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
      }
    },

    close(action = false) {
      this.$emit("close", action);
    },

    async registerRoom() {
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
        if (this.roomModal.type == "edit") {
          response = await RoomService.update(this.room);
        } else {
          this.room.characteristics.forEach((item) => {
            this.room[item] = 1;
          });

          response = await RoomService.register(this.room);
        }
        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title:
                this.roomModal.type == "edit"
                  ? "Habitación Actualizada"
                  : "Habitación Registrada",
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
        console.log(error);
        // this.loading = false;
        // this.disableAll = true;

        // this.$toast({
        //   component: ToastificationContent,
        //   position: "top-right",
        //   props: {
        //     title: "Error",
        //     icon: "AlertTriangleIcon",
        //     variant: "danger",
        //     // text: error.response?.data?.error,
        //     text: "Error al registrar habitación",
        // },
        // });
      } finally {
        this.loading = false;
        this.disableAll = false;
        await this.removePreloader();
      }
    },
  },
};
</script>
  
<style>
.checkbox-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>