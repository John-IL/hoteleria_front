import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from "./app"
import appConfig from "./app-config"
import verticalMenu from "./vertical-menu"
import auth from "@/store/auth";
import SidebarStore from "@/store/sidebar";
import UserStore from "@/store/user/user.store.js";
import loading from "@/store/loading/index.js";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    SidebarStore,
    UserStore,
    loading
  },
  strict: process.env.DEV,
})
