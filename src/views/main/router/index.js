import UserMain from "@/views/main/views/UsersMain.vue";
const routes = [
  {
    path: "/",
    redirect: { name: "panel" },
    meta: { module: 1 },
    component: UserMain,
    children: [
      {
        path: "/panel",
        name: "panel",
        component: () =>
          import("@/views/main/views/dashboard/DashboardMain.vue"),
        meta: {
          pageTitle: "Panel",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },

      {
        path: "/usuarios",
        name: "usuarios",
        component: () => import("@/views/main/views/user/UsersList.vue"),
        meta: {
          pageTitle: "Usuarios",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },

      {
        path: "/promociones",
        name: "promociones",
        component: () =>
          import("@/views/main/views/promotions/PromotionList.vue"),
        meta: {
          pageTitle: "Promociones",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/habitaciones",
        name: "habitaciones",
        component: () => import("@/views/main/views/room/ListRoom.vue"),
        meta: {
          pageTitle: "Habitaciones",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/testimonios",
        name: "testimonios",
        component: () =>
          import("@/views/main/views/testimony/TestimonyList.vue"),
        meta: {
          pageTitle: "Testimonios",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/banner",
        name: "banner",
        component: () => import("@/views/main/views/banner/BannerList.vue"),
        meta: {
          pageTitle: "Banners",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/categorias",
        name: "categorias",
        component: () => import("@/views/main/views/category/CategoryList.vue"),
        meta: {
          pageTitle: "Categorias",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/reservas",
        name: "reservas",
        component: () => import("@/views/main/views/reserve/ReserveList.vue"),
        meta: {
          pageTitle: "Reservas",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/clientes",
        name: "clientes",
        component: () => import("@/views/main/views/client/ClientList.vue"),
        meta: {
          pageTitle: "Clientes",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/mensajes",
        name: "mensajes",
        component: () => import("@/views/main/views/messages/MessagesList.vue"),
        meta: {
          pageTitle: "Mensajes",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/configuraciones",
        name: "configuraciones",
        component: () => import("@/views/main/views/messages/MessagesList.vue"),
        meta: {
          pageTitle: "Mensajes",
          breadcrumb: [
            {
              text: "Lista",
            },
          ],
          section: 4,
        },
      },
      {
        path: "/reportes",
        name: "reportes",
        redirect: { name: "reporte-prediccion" },
        component: () => import("@/views/main/views/report/ReportMain.vue"),
        meta: {
          section: 4,
        },
        children: [
          {
            path: "/reportes/prediccion",
            name: "reporte-prediccion",
            component: () => import("@/views/main/views/report/views/predict/Predict.vue"),
            meta: {
              pageTitle: "Reportes",
              breadcrumb: [
                {
                  text: "Predecir",
                },
              ],
            }
          },
          {
            path: "/reportes/reservas",
            name: "reporte-reservas",
            component: () => import("@/views/main/views/report/views/reserves/Reserves.vue"),
            meta: {
              pageTitle: "Reportes",
              breadcrumb: [
                {
                  text: "Reservas",
                },
              ],
            }
          },
          {
            path: "/reportes/clientes",
            name: "reporte-clientes",
            component: () => import("@/views/main/views/report/views/clients/Clients.vue"),
            meta: {
              pageTitle: "Reportes",
              breadcrumb: [
                {
                  text: "Clientes",
                },
              ],
            }
          }
        ]
      },
    ],
  },
];

export default routes;
