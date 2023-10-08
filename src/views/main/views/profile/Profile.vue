<template>
  <div v-if="S_USER_PROFILE" id="user-profile">
    <profile-header :header-data="S_USER_PROFILE" />

    {{ S_USER_PROFILE }}
    <!-- <section id="profile-info">
      <b-row>
        <b-col lg="3" cols="12" order="2" order-lg="1">
          <profile-about :about-data="profileData.userAbout" />
          <profile-suggested-pages :pages-data="profileData.suggestedPages" />
          <profile-twitter-feed :twitter-feed="profileData.twitterFeeds" />
        </b-col>

        <b-col lg="6" cols="12" order="1" order-lg="2">
          <profile-post :posts="profileData.post" />
        </b-col>

        <b-col lg="3" cols="12" order="3">
          <profile-latest-photos :latest-images="profileData.latestPhotos" />
          <profile-suggestion :suggestions="profileData.suggestions" />
          <profile-polls :polls-data="profileData.polls" />
        </b-col>

        <b-col cols="12" order="4">
          <profile-bottom />
        </b-col>
      </b-row>
    </section> -->
  </div>
</template>

<script>
// import { BRow, BCol } from "bootstrap-vue";
import ProfileHeader from "./ProfileHeader.vue";
import ProfileAbout from "./ProfileAbout.vue";
import ProfileSuggestedPages from "./ProfileSuggestedPages.vue";
import ProfileTwitterFeed from "./ProfileTwitterFeed.vue";
import ProfilePost from "./ProfilePost.vue";
import ProfileLatestPhotos from "./ProfileLatestPhotos.vue";
import ProfileSuggestion from "./ProfileSuggestion.vue";
import ProfilePolls from "./ProfilePolls.vue";
import profileBottom from "./profileBottom.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    // BRow,
    // BCol,
    ProfileHeader,
    ProfileAbout,
    ProfileSuggestedPages,
    ProfileTwitterFeed,
    ProfilePost,
    ProfileLatestPhotos,
    ProfileSuggestion,
    ProfilePolls,
    profileBottom,
  },
  data() {
    return {
      profileData: {},
    };
  },
  methods: {
    ...mapActions({
      A_GET_USER_PROFILE: "UserStore/A_GET_USER_PROFILE",
      UPDATE_NAV_MENU_HIDDEN: "appConfig/UPDATE_NAV_MENU_HIDDEN",
    }),
  },
  computed: {
    ...mapState("UserStore", ["S_USER_PROFILE"]),
  },
  created() {
    this.UPDATE_NAV_MENU_HIDDEN(true);
    this.$http.get("/profile/data").then((res) => {
      this.profileData = res.data;
      console.log(this.profileData);
    });
    this.A_GET_USER_PROFILE();
  },
  destroyed() {
    this.UPDATE_NAV_MENU_HIDDEN(false);
  },
};
</script>

<style lang="scss" >
@import "@core/scss/vue/pages/page-profile.scss";
</style>
