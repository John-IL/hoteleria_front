<template>
  <div class="px-5 my-5">
    <h3 class="text-center">Contáctanos</h3>
    <b-card>
      <b-form @submit.prevent="submitForm">
        <b-row>
          <b-col cols="6">
            <b-form-group label="Nombre" label-for="name-input">
              <b-form-input id="name-input" v-model="client.first_name" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Apellido" label-for="name-input">
              <b-form-input id="name-input" v-model="client.last_name" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Correo" label-for="email-input">
              <b-form-input id="email-input" v-model="client.email" type="email" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Celular" label-for="phone-input">
              <b-form-input id="phone-input" v-model="client.phone" type="text" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Message" label-for="message-input">
              <b-form-textarea id="message-input" v-model="client.message" required></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        {{ mensaje }}
        <b-button type="submit" variant="primary">Enviar</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import MessageService from "@/views/main/views/messages/services/message.service.js";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  data() {
    return {
      client: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: ""
      },
      socket: null,
      mensaje: ''
    };
  },

  methods: {
    async submitForm() {
      const { data } = await MessageService.register(this.client);
      if (data.code == 200) {
        this.client = {};
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Mensage Enviado",
            icon: "ThumbsUpIcon",
            variant: "success",
            text: data.message,
          },
        });
      } else {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Error",
            icon: "ThumbsDownIcon",
            variant: "danger",
            text: data.message,
          },
        });
      }
    },
  },

  beforeDestroy() {
    this.socket.close();
  },
};
</script>

<style></style>