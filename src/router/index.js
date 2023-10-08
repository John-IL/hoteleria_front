import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";

// Routes
import { canNavigate } from "@/libs/acl/routeProtection";
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@/auth/utils";
import pages from "./routes/pages";
import UsersRoute from "@/views/main/router/index";

import others from "./routes/others";

Vue.use(VueRouter);
Vue.use(store);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/main/views/landing/Landing.vue'),
      meta: {
        layout: "full",
      },
    },
    { path: "/", redirect: { name: "landing" } },
    ...pages,
    ...UsersRoute,
    ...others,
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = isUserLoggedIn();
  const userData = getUserData();
  const userModules = [];
  const nextModule = to.matched[0]?.meta?.module;
  const loginRoute = "auth-login";
  const unAuthorizedRoute = "misc-not-authorized";
  const moduleIsUndefined = nextModule == undefined;
  const fromIsDifferentTo = from.matched[0]?.meta?.module != nextModule;

  router.onReady(() => {
    if (!moduleIsUndefined && fromIsDifferentTo) {
      if (userData) {
        store.dispatch("auth/updateCurrentUserModuleRole", nextModule);
      }
      store.commit("SidebarStore/SET_NAVIGATION_ITEMS_BY_MODULE", {
        module: nextModule,
      });
    }
  });

  if (isLoggedIn) {
    if (!canNavigate(to, userModules)) {
      // Redirect to login if not logged in
      // if (!isLoggedIn) return next({ name: loginRoute });
      // If logged in => not authorized
      if (to.name !== unAuthorizedRoute) {
        console.log("0");
        return next({ name: unAuthorizedRoute });
      }
      console.log("1");
      return next({ name: "panel" });
    }
  }
  //  else if (to.name !== loginRoute) {
  //   return next({ name: loginRoute });
  // }
  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    // next(getHomeRouteForLoggedInUser(userData ? userData.role_id : null));
    console.log("2");
    next({ name: "panel" });
  }
  return next();
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
