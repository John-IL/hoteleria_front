import { getUserData, getUserToken } from "@/auth/utils.js";
import Vue from "vue";
import GeneralService from "@/views/services/general.service.js";

const user = getUserData();
const token = getUserToken();

export default {
    namespaced: true,
    state: {
        dataUser: user,
        token,
    },
    getters: {
        dataUser: (state) => state.dataUser,
        currentUser: (state) => state.dataUser,
        token: (state) => state.token,
        isCeo: (state) => state.dataUser?.isCeo,
        roleId: (state) => state.dataUser?.role_id,
        userModules: (state) => state.dataUser?.arr_modules,
        userSections: (state) => state.dataUser?.arr_sections,
    },
    mutations: {
        SET_DATA_USER(state, val) {
            state.dataUser = val;
        },
        SET_TOKEN(state, val) {
            state.token = val;
        },
        SET_CURRENT_USER_MODULE(state, module) {
            state.dataUser.modul_id = module;
        },
    },
    actions: {
        updateDataUser({ commit }, user) {
            commit("SET_DATA_USER", user);
        },
        updateToken({ commit }, token) {
            commit("SET_TOKEN", token);
        },
        updateCurrentUserModuleRole({ commit, state }, module) {
            commit("SET_CURRENT_USER_MODULE", module);
            localStorage.setItem("userData", JSON.stringify(state.dataUser));
        },
    }
}