<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="countMessages+''"
        badge-classes="bg-primary"
        class="text-body"
        icon="MessageSquareIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Mensajes
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ countMessages }} Nuevos
        </b-badge>
      </div>
    </li>

    <!-- Notifications -->
    <vue-perfect-scrollbar
      v-once
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <!-- Account Notification -->
      <b-link
        v-for="message in messages"
        :key="message.id"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              variant="primary"
            />
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ message.full_name ? message.full_name : "Nuevo Usuario"}}
            </span>
          </p>
          <small class="notification-text"> Mensaje de contacto </small>
        </b-media>
      </b-link>

      <!-- System Notification Toggler -->
      <!-- <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
          System Notifications
        </h6>
        <b-form-checkbox
          :checked="true"
          switch
        />
      </div> -->

      <!-- System Notifications -->
      <!-- <b-link
        v-for="notification in systemNotifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link> -->
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <b-button :to="{name:'mensajes'}"
      variant="primary"
      block
    >Ver Todo</b-button>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },

  computed:{
    ...mapGetters({
      messages:"UserStore/G_MESSAGES"
    }),

    countMessages(){
      return this.messages.length
    }
  },

  data(){
    return {
      perfectScrollbarSettings:{
        maxScrollbarLength: 60,
        wheelPropagation: false,
      }
    }
  },

  methods:{
    ...mapActions({
      getMessages: "UserStore/A_GET_MESSAGES"
    })
  },

  async created(){
    await this.getMessages();
  }

}
</script>

<style>

</style>
