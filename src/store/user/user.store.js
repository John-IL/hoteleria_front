import UserService from "@/views/main/services/user.service.js";
import MessageService from "@/views/main/views/messages/services/message.service";

export default {
  namespaced: true,
  state: {
    S_USER_PROFILE: {},
    S_MESSAGES: []
  },
  getters: {
    G_USER_PROFILE: (state) => state.S_USER_PROFILE,
    G_MESSAGES: (state) => state.S_MESSAGES,
  },
  mutations: {
    SET_USER_PROFILE(state, payload) {
      state.S_USER_PROFILE = payload;
    },
    SET_MESSAGES(state, payload) {
      state.S_MESSAGES = payload;
    },
  },
  actions: {
    async A_GET_USER_PROFILE({ commit }, payload) {
      try {
        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const { data } = await UserService.getProfileInfo(userId);
        commit("SET_USER_PROFILE", data[0]);
      } catch (error) {
        throw error;
      }
    },
    async A_GET_MESSAGES({ commit }, payload) {
      try {
        const { data } = await MessageService.NotReaded();
        commit("SET_MESSAGES", data);
      } catch (error) {
        throw error;
      }
    },
  },
};

// export default {
//     namespaced: true,
//     state: {
//       S_SIDEBAR_ITEMS: [],
//     },
//     getters: {
//       G_SIDEBAR_ITEMS: (state) => state.S_SIDEBAR_ITEMS,
//     },
//     mutations: {
//       UPDATE_SIDEBAR_ITEM_PROPERTY(state, payload) {
//         // eslint-disable-next-line array-callback-return
//         state.S_SIDEBAR_ITEMS.map((item) => {
//           if (item?.route === payload.routeName) {
//             // eslint-disable-next-line no-param-reassign
//             item.tag = payload.tag
//           }
//         })
//       },
//       SET_NAVIGATION_ITEMS_BY_MODULE(state, payload) {
//         const navigationItems = getNavigationByModule(payload.module)
//         state.S_SIDEBAR_ITEMS = navigationItems
//       },
//     },
//   }
