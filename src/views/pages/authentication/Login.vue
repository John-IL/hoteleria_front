<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <b-img :src="logo" alt="logo" style="max-height: 40px" />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
            <span
              v-t="{
                path: 'Welcome to',
                locale: $i18n.locale,
                args: { app: 'App-Hospedaje Tony! 👋' },
              }"
            ></span>
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <b-alert variant="primary" show>
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50"
                  ><span class="font-weight-bold">Example: </span>
                  example@example.com
                </small>
              </p>
            </div>

            <feather-icon
              v-b-tooltip.hover.left="'This is just for ACL demo purpose'"
              icon="HelpCircleIcon"
              size="18"
              class="position-absolute"
              style="top: 10; right: 10"
            />
          </b-alert>

          <!-- form -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="loginAccess">
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">{{ $t("Password") }}</label>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <!-- <small>Forgot Password?</small> -->
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                v-if="!loading"
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
                v-t="'Sign in'"
              >
              </b-button>
              <b-button
                v-else
                variant="primary"
                v-t="'Loading...'"
                disabled
                block
              >
                <b-spinner class="ml-1" small />
              </b-button>
            </b-form>
          </validation-observer>

          <!--  <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{ name: 'auth-register' }">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text> -->

          <!-- divider -->
          <!--   <div class="divider my-2">
            <div class="divider-text">or</div>
          </div> -->

          <!-- social buttons -->
          <!-- <div class="auth-footer-btn d-flex justify-content-center">
            <b-button variant="facebook" href="javascript:void(0)">
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button variant="twitter" href="javascript:void(0)">
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button variant="google" href="javascript:void(0)">
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button variant="github" href="javascript:void(0)">
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div> -->
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
  BSpinner,
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    BSpinner,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "RMvv1998@",
      userEmail: "richardvalentin@outlook.com",
      sideImg: require("@/assets/images/pages/login-v2.svg"),

      // validation rules
      required,
      email,
      loading: false,
      logo: require("@/assets/images/logo/logo.png"),
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    orderSections(sections) {
      sections.sort((a, b) => {
        if (a.section_id < b.section_id) {
          return -1;
        } else if (a.section_id > b.section_id) {
          return 1;
        } else {
          return 0;
        }
      });
      return sections;
    },

    async loginAccess() {
      const response = await this.$refs.loginForm.validate();
      if (response) {
        await this.login();
      }
    },

    async login() {
      this.loading = true;
      try {
        const response = await useJwt.login({
          email: this.userEmail,
          password: this.password,
        });
        const userToken = response.data.token;
        const user_data = response.data.user;

        if (user_data.status === 1) {
          let userData = {
            ability: user_data.ability,
            avatar: user_data.avatar,
            email: user_data.email,
            fullName: user_data.full_name,
            id: user_data.user_id,
            role_id: user_data.role_id,
            arr_sections: this.orderSections(user_data.arr_sections),
            role: user_data.role_name,
            is_ceo: user_data.is_ceo,
            username: user_data.user_name,
            area_id: user_data.area_id,
          };

          useJwt.setToken(userToken);
          localStorage.setItem("userData", JSON.stringify(userData));

          this.$ability.update(userData.ability);
          await this.$store.dispatch("auth/updateDataUser", userData);
          await this.$store.dispatch("auth/updateToken", userToken);

          this.$router
            .replace(getHomeRouteForLoggedInUser(userData))
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                  title: `Bienvenido ${userData.fullName}`,
                  icon: "CoffeeIcon",
                  variant: "success",
                  text: `Has iniciado sesión correctamente como ${userData.role}. ¡Ya puedes empezar a explorar!
`,
                },
              });
            });
        } else {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Error",
              icon: "AlertTriangleIcon",
              variant: "danger",
              text: "Usuario inactivo, contacte con el administrador."
            },
          });
        }
      } catch (error) {
        this.loading = false;
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Error",
            icon: "AlertTriangleIcon",
            variant: "danger",
            text:  "Usuario o contraseña incorrectos"
          },
        });
        // }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
