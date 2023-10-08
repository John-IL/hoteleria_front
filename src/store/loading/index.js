export default {
  namespaced: true,
  state: {
    loading: false,
  },

  mutations: {
    SET_LOADING(state, payload) {
      return (state.loading = payload);
    },
  },

  getters: {
    loading: (state) => state.loading,
  },
};
