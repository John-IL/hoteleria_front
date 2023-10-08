import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import vSelect from "vue-select";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import HeaderSlot from '@/@core/layouts/components/AppBreadcrumb.vue';
import PreLoader from '@/views/components/loader/DotLloader.vue';


Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('vSelect',vSelect)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component("header-slot", HeaderSlot);
Vue.component("pre-loader", PreLoader);
