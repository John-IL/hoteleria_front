export default [
  {
    path: "/home",
    name: "zerg-menu",
    component: () => import("@/views/menu/Menu.vue"),
    meta: {
      layout: 'horizontal',
      module: 0,
    },
  },
];
