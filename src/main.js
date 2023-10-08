import Vue from "vue";
import {
  ToastPlugin,
  ModalPlugin,
  BootstrapVue,
  BootstrapVueIcons,
} from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";

import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";
import { DateinputsInstaller } from "@progress/kendo-dateinputs-vue-wrapper";

import ScrollBar from "@morioh/v-perfect-scrollbar";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import i18n from "@/libs/i18n";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import VueTheMask from "vue-the-mask";
// Global Components
import "./global-components";
import "./filters/general";

import generalMixins from "./mixins/general";

// Global Mixins
import modalMixin from "@/mixins/modal";
import loadingMixin from "@/mixins/loading";
// 3rd party plugins
import "@axios";
import "@/libs/acl";
import "@/libs/portal-vue";
import "@/libs/clipboard";
import "@/libs/toastification";
import "@/libs/sweet-alerts";
import "@/libs/vue-select";
import "@/libs/tour";
import moment from "moment";

window.moment = moment;
Vue.prototype.$moment = moment;

import "./validation/rules";

// Axios Mock Adapter
import "@/@fake-db/db";

Vue.use(ScrollBar);
Vue.filter('myHourTime', created => moment(created).format('h:mm A'))


Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(DateinputsInstaller);
// Composition API
Vue.use(VueCompositionAPI);
Vue.use(VueTheMask);
Vue.mixin(generalMixins);
Vue.use(VueCompositionAPI);
Vue.use(VueTheMask);
// Mixin
Vue.mixin(modalMixin);
Vue.mixin(loadingMixin);
// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require("@core/assets/fonts/feather/iconfont.css"); // For form-wizard

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

Vue.config.productionTip = false;
// initialize(router)
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
