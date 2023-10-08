export default [
  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/error/Error404.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      action: "read",
    },
  },
  {
    path: "/login",
    name: "auth-login",
    component: () => import("@/views/pages/authentication/Login.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/forgot-password",
    name: "auth-forgot-password",
    component: () => import("@/views/pages/authentication/ForgotPassword.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/pages/miscellaneous/not-authorized",
    name: "misc-not-authorized",
    component: () => import("@/views/pages/miscellaneous/NotAuthorized.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
    },
  },
  {
    path: "/profile",
    name: "pages-profile",
    component: () => import("@/views/main/views/profile/Profile.vue"),
    meta: {
      breadcrumb: [
        {
          text: "Profile",
          active: true,
        },
      ],
    },
  },
  // {
  //   path: "/pages/home",
  //   name: "landing",
  //   component: () => import("@/views/main/views/landing/Landing.vue"),
  //   meta: {
  //     layout: "full",
  //     // resource: "Auth",
  //   },
  // },
];
