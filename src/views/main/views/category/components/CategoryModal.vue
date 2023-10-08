<template>
  <div>
    <b-modal
      :title="categoryModal.type == 'edit' ? 'Editar Categoria': 'Crear Categoria'"
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
                  rules="max:100|required"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="category.name"
                      type="text"
                      placeholder="Ingrese el nombre de la categoría"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="6" class="mt-1">
              <b-form-group>
                <div class="d-flex justify-content-between text-white">
                  <label for="color">Color</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="color"
                  vid="color"
                  :rules="type === 'optional' ? '' : 'required'"
                >
                  <b-input-group>
                    <b-form-input
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="category.color"
                      type="color"
                      placeholder="Ingrese el color de la categoría"
                      :disabled="disableAll"
                    ></b-form-input>
                  </b-input-group>
                </validation-provider>
              </b-form-group>
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
                  :rules="type === 'optional' ? 'max:255' : 'max:255|required'"
                >
                  <b-input-group>
                    <b-textarea
                      :class="{ 'border-danger rounded': errors[0] }"
                      v-model="category.description"
                      type="text"
                      placeholder="Ingrese la descripción de la categoria"
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
                      v-model="category.image"
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
                  @click="registerCategory"
                  variant="primary"
                  :disabled="invalid || disableAll"
                >
                  {{ categoryModal.type == 'edit' ? 'Actualizar': 'Guardar' }}
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
import CategoryService from "@/views/main/views/category/services/category.service.js";

export default {
  props: {
    type: {
      type: String,
      default: "required",
    },
    categoryModal: {
      required: true,
      type: Object,
      default: function(){
        return {}
      }
    },
  },
  data() {
    return {
      category: { ...this.categoryModal.data },
      title: "Crear categoría",
      showModal: true,
      loading: false,
      disableAll: false,
      disable: {
        type: true,
        first_name: true,
        last_name: true,
      },
    };
  },

  async mounted() {},

  methods: {
    close(action = false) {
      this.$emit("close", action);
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
        const titleMessage = this.categoryModal.type == "edit" ? "Categoria Actualizada": "Categoria Registrada";
        const formData = new FormData();
        formData.append('name', this.category.name);
        formData.append('color', this.category.color);
        formData.append('description', this.category.description);
        formData.append('image', this.category.image);
        formData.append('id', this.category.id)
        formData.append('status', this.category.status)

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


        if (this.categoryModal.type == "edit") {
          response = await CategoryService.update(formData,headers);
        } else {
          response = await CategoryService.register(formData, headers);
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
  
<style>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "Buscar";
}
</style>