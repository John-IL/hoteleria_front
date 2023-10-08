export default {
  methods: {
    addPreloader() {
      this.$store.commit("loading/SET_LOADING", true);
    },
    removePreloader() {
      this.$store.commit("loading/SET_LOADING", false);
    }
  },
}