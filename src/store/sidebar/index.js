import { getNavigationByModule } from "@/helpers/navigations"
export default {
  namespaced: true,
  state: {
    S_SIDEBAR_ITEMS: [],
  },
  getters: {
    G_SIDEBAR_ITEMS: (state) => state.S_SIDEBAR_ITEMS,
  },
  mutations: {
    UPDATE_SIDEBAR_ITEM_PROPERTY(state, payload) {
      // eslint-disable-next-line array-callback-return
      state.S_SIDEBAR_ITEMS.map((item) => {
        if (item?.route === payload.routeName) {
          // eslint-disable-next-line no-param-reassign
          item.tag = payload.tag
        }
      })
    },
    SET_NAVIGATION_ITEMS_BY_MODULE(state, payload) {
      const navigationItems = getNavigationByModule(payload.module)
      state.S_SIDEBAR_ITEMS = navigationItems
    },
  },
}
