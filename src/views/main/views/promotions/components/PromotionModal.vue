<template>
  <div>
    <b-modal
      :title="promotionModal.type == 'edit' ? 'Editar Promocion': 'Crear Promocion'"
      v-model="showModal"
      modal-class="modal-primary"
      hide-footer
      @hidden="close"
      size="lg"
      loading
    >
      <validation-observer ref="checkForm" #default="{ invalid }" v-if="true">
          <b-row>
            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="name">Nombre</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="name"
                  vid="name"
                  rules="max:255|required"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="promotion.name"
                      type="text"
                      placeholder="Ingrese el nombre de la promoción"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="cost">Descuento</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="cost"
                  vid="cost"
                  rules="required"
                >
                  <b-input-group>
                    <template v-slot:prepend>
                      <b-input-group-text>S/.</b-input-group-text>
                    </template>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="promotion.cost"
                      placeholder="Ingrese el descuento de la promoción"
                      v-mask="'###.###.##'"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="name">Descripción</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="name"
                  vid="name"
                  :rules="type === 'optional' ? 'max:255' : 'max:255|required'"
                >
                  <b-input-group>
                    <b-textarea
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="promotion.description"
                      type="text"
                      placeholder="Ingrese la descripción de la promoción"
                      :disabled="disableAll"
                      :rows="3"
                    ></b-textarea>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="image">Imagen</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="image"
                  vid="image"
                  :rules="type === 'optional' ? '' : 'required'"
                >
                  <b-input-group>
                    <b-form-file
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="promotion.image"
                      type="text"
                      placeholder="Ingrese una imagen"
                      :disabled="disableAll"
                    ></b-form-file>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" class="mt-2">
              <div class="d-flex justify-content-end">
                <b-button
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
                  @click="registerPromotion"
                  :disabled="invalid || disableAll"
                >
                 {{ promotionModal.type == "edit" ? 'Actualizar':'Guardar' }}
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
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import PromotionService from "@/views/main/views/promotions/services/promotion.service.js";

export default {
  props: {
    type: {
      type: String,
      default: "required",
    },
    promotionModal: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      title: "Crear promoción",
      showModal: true,
      loading: false,
      disableAll: false,
      disable: {
        type: true,
        first_name: true,
        last_name: true,
      },
      promotion: {...this.promotionModal.data},
    };
  },

  methods: {
    close(action = false) {
      this.$emit("close", action);
    },

    async registerPromotion() {
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
        const formData = new FormData();
        formData.append('name', this.promotion.name);
        formData.append('description', this.promotion.description);
        formData.append('cost', this.promotion.cost);
        formData.append('image', this.promotion.image);
        formData.append('id', this.promotion.id);
        formData.append('status', this.promotion.status);
        
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

        if (this.promotionModal.type == "edit") {
          response = await PromotionService.update(formData,headers);
        } else {
          response = await PromotionService.register(formData,headers);
        }
        if (response.data.code == 200) {
          this.$emit("refreshTable");
          this.close();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: this.promotionModal.type == "edit" ? "Promoción Actualizada": 'Promocion Registrada',
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
            text: "Error al registrar promoción",
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
  
<style>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "Buscar";
}
</style>